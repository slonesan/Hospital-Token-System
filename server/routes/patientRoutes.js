import express from "express";
import {
    createPatient,
    getPatientByToken,
    getAllPatients,
    updatePatientStatus
} from "../controllers/patientController.js";

const router = express.Router();

// Register a new patient
router.post("/", createPatient);

// Get all patients
router.get("/", getAllPatients);

// Get patient by token
router.get("/:token", getPatientByToken);

// Update patient status
router.patch("/:token/status", updatePatientStatus);

export default router;