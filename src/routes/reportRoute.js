import express from "express";

import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";
import { getReports, getReportByID, getReportsByUser, createReport, deleteReportByID } from "../controllers/reportController.js";

const reportRouter = express.Router();

reportRouter.get("/reports", verifyToken, verifyAdmin, getReports);
reportRouter.get("/report/:id", verifyToken, verifyAdmin, getReportByID);
reportRouter.get("/reports/user/:uuid", verifyToken, verifyAdmin, getReportsByUser);
reportRouter.post("/report", verifyToken, createReport);
reportRouter.delete("/report/:id", verifyToken, verifyAdmin, deleteReportByID);