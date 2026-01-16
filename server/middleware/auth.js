import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: "Authentication required."});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error){
        res.status(401).json({message: "Invalid token."});
    }
}

export default auth;