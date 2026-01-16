import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    try {
        const {email, username, password} = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({message: "Missing Fields."});
        }
        const ifExists = await User.findOne({email});
        if(ifExists){
            return res.status(409).json({message: "Email is already registered."})
        }

        const user = new User({email, username});
        await user.setPassword(password);
        await user.save();

        return res.status(201).json({message: "Successfully registered."});
    } catch (error) {
        console.error("Registration Failed.");
    }
}

export async function login(req, res) {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Missing Fields."});
        }
        if(!user || !(await user.validatePassword(password))) {
            return res.status(401).json({message: "Invalid email or password."});
        }
        if(user.status !== "active") {
            return res.status(401).json({message: "Account is disabled. Contact an Admin."});
        }
        
        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        
        res.status(200).json({message: "Login successful.", user: {id: user._id, name: user.username}});
    } catch (error){
        res.status(500).json({message: "Login failed."});
    }
}

export async function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    });
    res.status(200).json({message: "Logout successful."});
}