import Patient from "../models/Patient.js";
import QRCode from "qrcode";
import { sendWhatsApp } from "../utils/sendWhatsApp.js";

const prefixes = {
    Cardiology: "C",
    Neurology: "N",
    Orthopedics: "O",
    Pediatrics: "P",
    Dermatology: "D",
    General: "G"
};

// Frontend URL where React is running
const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://localhost:5173";

export const createPatient = async (req, res) => {

    try {

        const {
            department,
            name,
            age,
            gender,
            phone,
            symptoms
        } = req.body;

        // Find latest patient in selected department
        const lastPatient = await Patient.findOne({ department })
            .sort({ tokenNumber: -1 });

        // Generate next token number
        const nextToken = lastPatient
            ? lastPatient.tokenNumber + 1
            : 1;

        // Generate formatted token (e.g. C001)
        const formattedToken =
            prefixes[department] +
            String(nextToken).padStart(3, "0");

        // Tracking URL
        const trackingUrl = `${FRONTEND_URL}/track/${formattedToken}`;

        // QR for frontend
        const qrCode = await QRCode.toDataURL(trackingUrl);

        // QR for WhatsApp
        const qrUrl =
            `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(trackingUrl)}`;

        // Save patient
        const patient = await Patient.create({
            token: formattedToken,
            tokenNumber: nextToken,
            department,
            name,
            age,
            gender,
            phone,
            symptoms,
            qrCode
        });

        // Send WhatsApp
        try {

            await sendWhatsApp({
                phone,
                name,
                age,
                department,
                symptoms,
                token: formattedToken,
                qrUrl
            });

        } catch (whatsappError) {

            console.error("WhatsApp Error:", whatsappError.message);

        }

        res.status(201).json({
            success: true,
            token: formattedToken,
            patient,
            qrCode
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Get one patient
export const getPatientByToken = async (req, res) => {

    try {

        const { token } = req.params;

        const patient = await Patient.findOne({ token });

        if (!patient) {

            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });

        }

        res.status(200).json({
            success: true,
            patient
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Get all patients
export const getAllPatients = async (req, res) => {

    try {

        const patients = await Patient.find()
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: patients.length,
            patients
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// Update patient status
export const updatePatientStatus = async (req, res) => {

    try {

        const { token } = req.params;
        const { status } = req.body;

        const patient = await Patient.findOne({ token });

        if (!patient) {

            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });

        }

        patient.status = status;

        await patient.save();

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            patient
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};