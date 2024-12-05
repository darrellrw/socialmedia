import connection from "../../config/database.js";

export const getReports = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_reports(NULL);");
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getReportByID = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_reports_by_post(?);", [req.params.id]);
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getReportsByUser = async (req, res) => {
    try {
        const [results] = await connection.query("CALL get_reports_by_user(?);", [req.params.uuid]);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const createReport = async (req, res) => {
    const { uuid_user, id_post, reason} = req.body;
    try {
        await connection.query("CALL report_post(?, ?, ?);", [uuid_user, id_post, reason]);
        res.status(201).json({ message: "Report created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const deleteReportByID = async (req, res) => {
    try {
        await connection.query("CALL delete_report(?);", [req.params.id, req.user.uuid]);
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export const getReportCountByPost = async (req, res) => {
    try {
        const [results] = await connection.query("CALL count_reports_by_post(?, @report_count); SELECT @report_count AS report_count;", [req.params.id]);
        res.status(200).json({ report_count: results[1][0].report_count });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};