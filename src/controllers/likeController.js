import connection from "../../config/database.js";

export const getLikes = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM likes");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getLikeByID = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM likes WHERE id = ?", [req.params.id]);
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getLikesByPost = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM likes WHERE id_post = ?", [req.params.id_post]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getLikesByUser = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM likes WHERE uuid_user = ?", [req.params.uuid]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const createLike = async (req, res) => {
    const { id_post, uuid_user} = req.body;
    try {
        await connection.query("INSERT INTO likes (id_post, uuid_user) VALUES (?, ?)", [id_post, uuid_user]);
        res.status(201).json({ message: "Like created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const deleteLikeByID = async (req, res) => {
    try {
        await connection.query("DELETE FROM likes WHERE id = ? AND uuid_user = ?", [req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Like deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};