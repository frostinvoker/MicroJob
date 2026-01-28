import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    // Phone-based registration fields
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      minlength: 10,
      maxlength: 15,
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    // Email-based registration fields
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    // Common fields
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'manager', 'admin', 'superadmin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
