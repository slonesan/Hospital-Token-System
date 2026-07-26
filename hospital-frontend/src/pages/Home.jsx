import { useRef, useState } from "react";

import DepartmentCard from "../components/DepartmentCard";
import PatientForm from "./PatientForm";
import Success from "./Success";

import departments from "../data/departments";

import "../styles/Home.css";

function Home() {

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [patientData, setPatientData] = useState(null);

    const formRef = useRef(null);
    const successRef = useRef(null);

    const handleDepartmentSelect = (department) => {

        setSelectedDepartment(department);

        setPatientData(null);

        setTimeout(() => {

            formRef.current?.scrollIntoView({

                behavior: "smooth",

                block: "start",

            });

        }, 150);

    };

    return (

        <div className="home">

            <div className="background-blobs">

                <span className="blob blob1"></span>

                <span className="blob blob2"></span>

                <span className="blob blob3"></span>

            </div>

            {/* ================= HERO ================= */}

            <section className="hero">

                <h1>Smart Digital Hospital Token System</h1>

            </section>

            {/* ================= STEP 1 ================= */}

            <section className="section">

                <div className="section-title">

                    <div className="step">1</div>

                    <h2>Select Department</h2>

                </div>

                <div className="department-container">

                    {departments.map((department) => (

                        <DepartmentCard
                            key={department.id}
                            department={department}
                            onSelect={handleDepartmentSelect}
                        />

                    ))}

                </div>

            </section>

            {/* ================= STEP 2 ================= */}

            {selectedDepartment && (

                <section
                    ref={formRef}
                    className="section"
                >

                    <div className="section-title">

                        <div className="step">2</div>

                        <h2>Enter Patient Details</h2>

                    </div>

                    <div className="form-section">

                        <PatientForm
                            department={selectedDepartment}
                            setPatientData={(data) => {

                                setPatientData(data);

                                setTimeout(() => {

                                    successRef.current?.scrollIntoView({

                                        behavior: "smooth",

                                        block: "start",

                                    });

                                }, 150);

                            }}
                        />

                    </div>

                </section>

            )}

            {/* ================= STEP 3 ================= */}

            {patientData && (

                <section
                    ref={successRef}
                    className="section"
                >

                    <div className="section-title">

                        <div className="step">3</div>

                        <h2>Token Generated</h2>

                    </div>

                    <Success patientData={patientData} />

                </section>

            )}

        </div>

    );

}

export default Home;