import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },

        department: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true,
        },

        gender: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        symptoms: {
            type: String,
            required: true,
        },

        qrCode: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            default: "Waiting",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Patient", patientSchema);