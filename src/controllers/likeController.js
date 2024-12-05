import connection from "../../config/database.js";

export const getLikes = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_all_likes();");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getLikeByID = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_like_by_id(?);", [req.params.id]);
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getLikesByPost = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_likes_by_post(?);", [req.params.id_post]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getLikesByUser = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_likes_by_user(?);", [req.params.uuid]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const createLike = async (req, res) => {
    const { id_post, uuid_user} = req.body;
    try {
        await connection.query("CALL add_like(?, ?);", [id_post, uuid_user]);
        res.status(201).json({ message: "Like created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const deleteLikeByID = async (req, res) => {
    try {
        await connection.query("CALL delete_like(?, ?);", [req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Like deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getLikesCount = async (req, res) => { // Mendapatkan berapa banyak yang suka
    try {
        const [results] = await connection.query("CALL count_likes_by_post(?, @p_like_count); SELECT @p_like_count AS like_count;", [req.params.id_post]);
        res.status(200).json({ like_count: results[1][0].like_count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};