import connection from "../../config/database.js";

export const getPosts = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM posts");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getPostByID = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getPostsByUser = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM posts WHERE uuid_user = ?", [req.params.uuid]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const createPost = async (req, res) => {
    const { uuid_user, title, description} = req.body;
    try {
        await connection.query("INSERT INTO posts (uuid_user, title, description) VALUES (?, ?, ?)", [uuid_user, title, description]);
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const updatePostByID = async (req, res) => {
    const { title, description} = req.body;
    try {
        await connection.query("UPDATE posts SET title = ?, description = ? WHERE id = ? AND uuid_user = ?", [title, description, req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const deletePostByID = async (req, res) => {
    try {
        await connection.query("DELETE FROM posts WHERE id = ? AND uuid_user = ?", [req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};