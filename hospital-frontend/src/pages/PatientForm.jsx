import { useState } from "react";
import axios from "axios";

import "../styles/PatientForm.css";

function PatientForm({ department, setPatientData }) {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        symptoms: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.phone.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/patients`,
                {
                    department,
                    ...form,
                }
            );

            setPatientData(response.data);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to generate token."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <form
            className="patient-form"
            onSubmit={handleSubmit}
        >

            <h2>Patient Details</h2>

            <label>Department</label>

            <input
                type="text"
                value={department}
                disabled
            />

            <label>Patient Name</label>

            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
            />

            <label>Age</label>

            <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
            />

            <label>Gender</label>

            <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <label>Phone Number</label>

            <input
                type="tel"
                name="phone"
                value={form.phone}
                maxLength={10}
                onChange={handleChange}
                placeholder="9876543210"
                required
            />

            <label>Symptoms / Reason</label>

            <textarea
                rows="4"
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                placeholder="Describe the symptoms..."
                required
            />

            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Generating Token..."
                    : "Generate Token"}
            </button>

        </form>

    );

}

export default PatientForm;