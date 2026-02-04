import admin from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ message: "No authentication token provided." });
        next();
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        // Attach firebase user data to request
        req.firebaseUser = decodedToken; 
        next();
    } catch (error) {
        console.error("Firebase Verification Error:", error);
        return res.status(403).json({ message: "Unauthorized", error: error.message });
    }
};