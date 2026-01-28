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
        const {phoneNumber, firstName, lastName, password} = req.body;
        if (!phoneNumber ||  !firstName || !lastName || !password) {
            return res.status(400).json({message: "Missing Fields."});
        }
        const ifExists = await User.findOne({phoneNumber});
        if(ifExists){
            return res.status(409).json({message: "Phone Number is already registered."})
        }

        const user = new User({phoneNumber, firstName, lastName});
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
        const {phonenumber, password, phoneNumber} = req.body;
        // Support both phonenumber and phoneNumber field names
        const phone = phonenumber || phoneNumber;
        
        if(!phone || !password) {
            return res.status(400).json({message: "Missing Fields."});
        }
        
        // Search by either phoneNumber field
        const user = await User.findOne({$or: [{phoneNumber: phone}, {phonenumber: phone}]});
        if(!user || !(await user.validatePassword(password))) {
            return res.status(401).json({message: "Invalid phone number or password."});
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
                role: user.role
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
    res.status(200).json({message: "Logout successful."});
}