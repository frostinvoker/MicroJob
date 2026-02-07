import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Register a new user (supports both email/username and phone-based registration)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phoneNumber, firstName, lastName, role } = req.body;

    // Validate role
    const validRoles = ['hire', 'work', 'both', 'admin', 'superadmin'];
    const userRole = role && validRoles.includes(role) ? role : 'work';
    console.log('Register - User role being set to:', userRole);

    // Flexible validation - support both email-based and phone-based registration
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Phone-based registration (primary)
    if (phoneNumber && firstName && lastName) {
      if (!/^\d{10,15}$/.test(phoneNumber)) {
        return res.status(400).json({ message: 'Phone number must be 10-15 digits' });
      }

      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(409).json({ message: 'Phone number is already registered' });
      }

      const user = await User.create({
        phoneNumber,
        firstName,
        lastName,
        password,
        email: email?.toLowerCase() || null,
        role: userRole,
        status: 'pending',
      });

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
    }

    // Email/username-based registration (fallback)
    if (!username || !email) {
      return res.status(400).json({ message: 'Username, email, or phone number with firstName and lastName are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Split username into firstName and lastName
    const nameParts = username.trim().split(' ');
    const userFirstName = nameParts[0] || username;
    const userLastName = nameParts.slice(1).join(' ') || nameParts[0];

    const user = await User.create({
      firstName: userFirstName,
      lastName: userLastName,
      email: email.toLowerCase(),
      password,
      role: userRole,
      status: 'pending',
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login an existing user (supports email/username and phone)
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password, phoneNumber } = req.body;

    // Phone-based login
    if (phoneNumber) {
      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }

      const user = await User.findOne({ phoneNumber });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid phone number or password' });
      }

      if (user.status && user.status !== 'active') {
        return res.status(401).json({ message: 'Account is disabled. Contact an admin.' });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role || 'user' },
        process.env.JWT_SECRET || 'dev-secret',
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role || 'work',
        },
      });
    }

    // Email/username-based login
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: 'Email/username and password are required' });
    }

    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.status && user.status !== 'active') {
      return res.status(401).json({ message: 'Account is disabled. Contact an admin.' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role || 'user' },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role || 'work',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
});

// Logout
router.post('/logout', verifyToken, (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Logout successful' });
});

// Get user profile (requires authentication)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
