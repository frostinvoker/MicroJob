import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function getUserList(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Failed to retrieve users."});
    }
}
export async function register(req, res) {
    try {
        const {phoneNumber, email, firstName, lastName, username, password, role} = req.body;
        
        // Handle both web (username) and mobile (firstName/lastName) formats
        let finalFirstName = firstName;
        let finalLastName = lastName;
        
        if (username && !firstName && !lastName) {
            // Web client format - split username into first and last name
            const nameParts = username.trim().split(' ');
            finalFirstName = nameParts[0] || '';
            finalLastName = nameParts.slice(1).join(' ') || nameParts[0] || '';
        }
        
        // Validation
        if (!finalFirstName || !password || !email) {
            return res.status(400).json({message: "Missing Fields."});
        }
        
        // Ensure lastName has a value
        if (!finalLastName) {
            finalLastName = finalFirstName;
        }
        
        // Check if user exists by phone or email
        if (phoneNumber) {
            const phoneExists = await User.findOne({phoneNumber});
            if(phoneExists){
                return res.status(409).json({message: "Phone Number is already registered."})
            }
        }
        
        if (email) {
            const emailExists = await User.findOne({email});
            if(emailExists){
                return res.status(409).json({message: "Email is already registered."})
            }
        }

        // Validate role
        const validRoles = ["hire", "work", "both", "admin", "superadmin"];
        const userRole = role && validRoles.includes(role) ? role : "work";
        console.log("Register - User role being set to:", userRole);

        const user = new User({
            phoneNumber, 
            email, 
            firstName: finalFirstName, 
            lastName: finalLastName,
            role: userRole
        });
        await user.setPassword(password);
        await user.save();

        return res.status(201).json({message: "Successfully registered."});
    } catch (error) {
        console.error("Registration Failed.");
        return res.status(500).json({message: "Registration Failed."});
    }
}

export async function login(req, res) {
    try{
        console.log("Login request body:", req.body);
        const {phonenumber, password, phoneNumber, email, emailOrUsername} = req.body;
        // Support both web (emailOrUsername) and mobile (email) formats
        const phone = phonenumber || phoneNumber;
        const identifier = emailOrUsername || email || phone;
        
        console.log("Identifier:", identifier, "Password present:", !!password);
        
        if(!identifier || !password) {
            console.log("Missing fields - identifier:", identifier, "password:", !!password);
            return res.status(400).json({message: "Missing Fields."});
        }
        
        // Search by phoneNumber or email
        const user = await User.findOne({
            $or: [
                {phoneNumber: identifier}, 
                {phonenumber: identifier},
                {email: identifier}
            ]
        });
        if(!user || !(await user.validatePassword(password))) {
            return res.status(401).json({message: "Invalid credentials."});
        }
        if(user.status !== "active") {
            return res.status(401).json({message: "Account is disabled. Contact an Admin."});
        }
        
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7* 24 * 60 * 60 * 1000,
        });
        
        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role: user.role // hire, work, both, admin, superadmin
            }
        });
    } catch (error){
        console.error("Login error:", error);
        res.status(500).json({message: "Login failed."});
    }
}

export async function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    });
    return res.status(200).json({message: "Logout successful."});
}