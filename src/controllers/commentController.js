import connection from "../../config/database.js";

export const getComments = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_all_comments();");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getCommentByID = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_comment_by_id(?);", [req.params.id]);
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_comment_by_post(?);", [req.params.id_post]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getCommentsByUser = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_comments_by_user(?);", [req.params.uuid]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const createComment = async (req, res) => {
    const { id_post, uuid_user, description} = req.body;
    try {
        await connection.query("CALL add_comment(?, ?, ?);", [id_post, uuid_user, description]);
        res.status(201).json({ message: "Comment created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const updateCommentByID = async (req, res) => {
    const { description} = req.body;
    try {
        await connection.query("CALL update_comment(?, ?, ?);", [description, req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const deleteCommentByID = async (req, res) => {
    try {
        await connection.query("CALL delete_comment(?, ?);", [req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getCommentsCount = async (req, res) => {
    try {
        const [results] = await connection.query("CALL count_comments_by_post(?, @p_comment_count); SELECT @p_comment_count AS comment_count;", [req.params.id_post]);
        res.status(200).json({ comment_count: results[1][0].comment_count });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};