import jwt from "jsonwebtoken";
import connection from "../../config/database.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }

        req.user = user;
        next();
    });
};

export const verifyAdmin = async (req, res, next) => {
    const [user] = await connection.query("SELECT * FROM users WHERE uuid = ?", [req.user.uuid]);
    if (!user[0]) {
        return res.status(404).json({ message: "User not found" });
    }
    if (req.user.role !== 0) {
        return res.status(403).json({ message: "Admin resource! Access denied" });
    }

    next();
};