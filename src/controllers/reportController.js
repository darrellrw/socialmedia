import connection from "../../config/database.js";

export const getReports = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM reports");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getReportByID = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM reports WHERE id = ?", [req.params.id]);
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getReportsByUser = async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM reports WHERE uuid_user = ?", [req.params.uuid]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const createReport = async (req, res) => {
    const { uuid_user, id_post, reason} = req.body;
    try {
        await connection.query("INSERT INTO reports (uuid_user, id_post, reason) VALUES (?, ?, ?)", [uuid_user, id_post, reason]);
        res.status(201).json({ message: "Report created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const deleteReportByID = async (req, res) => {
    try {
        await connection.query("DELETE FROM reports WHERE id = ? AND uuid_user = ?", [req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};