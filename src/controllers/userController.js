import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import connection from "../../config/database.js";

dotenv.config();

export const getUsers = async (req, res) => {
    try {
        const [[results]] = await connection.query("CALL user_data(NULL);"); // Using stored procedure
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getUserByUUID = async (req, res) => {
    try {
        const [[results]] = await connection.query("CALL user_data(?);", [req.params.uuid]); // Using stored procedure
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        if (!refreshToken) {
            return res.status(401).json({ message: "User is not authenticated" });
        }

        const [user] = await connection.query("CALL search_refresh_token(?);", [refreshToken]);
        if (!user[0]) {
            return res.status(401).json({ message: "User is not authenticated" });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "User is not authenticated" });
            }

            const accessToken = jwt.sign({ uuid: user.uuid, name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
                // expiresIn: "20s" // Production
                expiresIn: "15m" // Testing
            });
    
            res.status(200).json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const register = async (req, res) => {
    const { name, email, password, confirmPassword, gender } = req.body;
    const uuid = uuidv4();

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please provide all required fields" });
    } else if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    } else if (password.length < 8) {
        return res.status(400).json({ message: "Password should be at least 8 characters long" });
    } else {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            await connection.query("CALL register_user(?, ?, ?, ?, ?);", [uuid, name, email, hashedPassword, gender]);

            res.status(201).json({ message: "User created successfully", uuid });
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.error(error);
        }
    }

};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await connection.query("CALL login_user(?);", [email]);
        if (!user[0]) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const accessToken = jwt.sign({ uuid: user[0].uuid, name: user[0].name, email: user[0].email }, process.env.ACCESS_TOKEN_SECRET, {
            // expiresIn: "20s" // Production
            expiresIn: "15m" // Testing
        });
        const refreshToken = jwt.sign({ uuid: user[0].uuid, name: user[0].name, email: user[0].email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1h"
        });
        await connection.query("CALL update_refresh_token(?, ?);", [refreshToken, user[0].uuid]);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    try {
        if (!refreshToken) {
            return res.status(204).json({ message: "No Content" });
        }

        const [user] = await connection.query("CALL search_refresh_token(?);", [refreshToken]);
        if (!user[0]) {
            return res.status(204).json({ message: "No Content" });
        }

        await connection.query("CALL logout_user(?);", [user[0].uuid]);
        
        res.clearCookie("refreshToken");
        res.status(204).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const updateUserDataByUUID = async (req, res) => {
    const { name, email, gender, description } = req.body;
    const uuid = req.params.uuid;

    try {
        await connection.query("CALL update_user_data(?, ?, ?, ?, ?);", [name, email, gender, description, uuid]);
        res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const updateUserPasswordByUUID = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const uuid = req.params.uuid;

    try {
        const [user] = await connection.query("CALL get_user_data(?);", [uuid]);
        const validPassword = await bcrypt.compare(oldPassword, user[0].password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        } else if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        } else if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password should be at least 8 characters long" });
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await connection.query("CALL update_user_password(?, ?);", [hashedPassword, uuid]);
            res.status(200).json({ message: "User password updated successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }

};

export const deleteUserByUUID = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        await connection.query("CALL delete_user(?);", [uuid]);
        res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};