import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "manager", "admin", "superadmin"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["active", "disabled"],
            default: "active",
        },
        passwordHashed: {
            type: String,
            required: true,
        },
    },
);
UserSchema.methods.setPassword = async function (password) {
    this.passwordHashed = await bcrypt.hash(password, 10);
};
UserSchema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.passwordHashed);
}

export default mongoose.model("User", userSchema)