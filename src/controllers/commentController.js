import connection from "../../config/database.js";

export const getComments = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM comments");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getCommentByID = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM comments WHERE id = ?", [req.params.id]);
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM comments WHERE id_post = ?", [req.params.id_post]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getCommentsByUser = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM comments WHERE uuid_user = ?", [req.params.uuid]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const createComment = async (req, res) => {
    const { id_post, uuid_user, description} = req.body;
    try {
        await connection.query("INSERT INTO comments (id_post, uuid_user, description) VALUES (?, ?, ?)", [id_post, uuid_user, description]);
        res.status(201).json({ message: "Comment created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const updateCommentByID = async (req, res) => {
    const { description} = req.body;
    try {
        await connection.query("UPDATE comments SET description = ? WHERE id = ? AND uuid_user = ?", [description, req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const deleteCommentByID = async (req, res) => {
    try {
        await connection.query("DELETE FROM comments WHERE id = ? AND uuid_user = ?", [req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};