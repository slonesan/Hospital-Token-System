import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/PatientForm.css";

function PatientForm() {
    const { state } = useLocation();
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.phone.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        console.log({
            department: state?.department,
            ...form,
        });

        navigate("/success");
    };

    return (
        <div className="patient-page">

            <form
                className="patient-form"
                onSubmit={handleSubmit}
            >

                <h1>Patient Details</h1>

                <label>Department</label>

                <input
                    type="text"
                    value={state?.department || ""}
                    disabled
                />

                <label>Patient Name</label>

                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    required
                />

                <label>Age</label>

                <input
                    type="number"
                    name="age"
                    onChange={handleChange}
                    required
                />

                <label>Gender</label>

                <select
                    name="gender"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <label>Phone Number</label>

                <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    onChange={handleChange}
                    required
                />

                <label>Symptoms / Reason</label>

                <textarea
                    rows="4"
                    name="symptoms"
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Generate Token
                </button>

            </form>

        </div>
    );
}

export default PatientForm;