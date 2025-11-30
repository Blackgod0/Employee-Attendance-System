import { Router } from "express";
import authenticateJWT from "../middleware/authMiddleware";
import {
  getAllAttendance,
  getEmployeeAttendance,
  getTeamSummary,
  exportAttendanceCsv,
  getTodayTeamStatus,
} from "../controllers/ManagerAttendanceController";

const router = Router();

router.get("/all", authenticateJWT, getAllAttendance);

router.get("/employee/:id", authenticateJWT, getEmployeeAttendance);

router.get("/summary", authenticateJWT, getTeamSummary);

router.get("/export", authenticateJWT, exportAttendanceCsv);

router.get("/today-status", authenticateJWT, getTodayTeamStatus);

export default router;
