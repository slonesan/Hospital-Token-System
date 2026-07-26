import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },

    tokenNumber: {
      type: Number,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
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
      enum: [
        "Waiting",
        "Called",
        "In Consultation",
        "Completed",
        "Cancelled",
      ],
      default: "Waiting",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patient", patientSchema);