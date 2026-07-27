import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hospital } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function TrackPatient() {
    const { token } = useParams();

    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPatient = async () => {
        try {
            const res = await fetch(`${API_URL}/${token}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setPatient(data.patient);
            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatient();

        const interval = setInterval(fetchPatient, 3000);

        return () => clearInterval(interval);
    }, [token]);

    const statusStyle = {
        Waiting: {
            color: "#FBBF24",
            emoji: "🟡",
        },
        Called: {
            color: "#38BDF8",
            emoji: "🔵",
        },
        "In Consultation": {
            color: "#A78BFA",
            emoji: "🩺",
        },
        Completed: {
            color: "#4ADE80",
            emoji: "✅",
        },
        Cancelled: {
            color: "#F87171",
            emoji: "❌",
        },
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0C1C14] via-[#102319] to-[#09120D] text-green-300 text-xl font-semibold">
                Loading Patient Details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0C1C14] via-[#102319] to-[#09120D] text-red-400 text-xl font-semibold">
                {error}
            </div>
        );
    }

    const currentStatus = statusStyle[patient.status];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0C1C14] via-[#102319] to-[#09120D]">

            {/* Background Glow */}

            <div className="absolute -top-52 -left-44 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[140px]" />

            <div className="absolute bottom-0 -right-44 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[160px]" />

            <div className="relative flex min-h-screen items-center justify-center px-6 py-12">

                <div className="w-full max-w-2xl rounded-3xl border border-green-900/40 bg-[#13251B] p-10 shadow-2xl">

                    {/* Header */}

                    <div className="mb-12 flex flex-col items-center">

                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-900/30">

                            <Hospital
                                size={30}
                                className="text-white"
                            />

                        </div>

                        <h1 className="text-4xl font-bold text-white">
                            Patient Tracking
                        </h1>

                        <p className="mt-3 text-center text-lg text-green-100/70">
                            Track your consultation status in real time
                        </p>

                    </div>

                    {/* Information */}

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Patient */}

                        <div className="rounded-2xl border border-green-900/40 bg-[#183225] p-6">

                            <p className="text-sm font-medium uppercase tracking-wide text-green-100/60">
                                Patient
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold text-white">
                                {patient.name}
                            </h2>

                        </div>

                        {/* Department */}

                        <div className="rounded-2xl border border-green-900/40 bg-[#183225] p-6">

                            <p className="text-sm font-medium uppercase tracking-wide text-green-100/60">
                                Department
                            </p>

                            <h2 className="mt-3 text-2xl text-white">
                                {patient.department}
                            </h2>

                        </div>

                        {/* Token */}

                        <div className="rounded-2xl border border-green-900/40 bg-[#183225] p-8 md:col-span-2">

                            <p className="text-center text-sm font-medium uppercase tracking-wide text-green-100/60">
                                Token
                            </p>

                            <h2 className="mt-4 text-center font-mono text-6xl font-bold tracking-[0.2em] text-green-400">
                                #{patient.token}
                            </h2>

                        </div>

                        {/* Status */}

                        <div className="rounded-2xl border border-green-900/40 bg-[#183225] p-8 md:col-span-2">

                            <p className="text-center text-sm font-medium uppercase tracking-wide text-green-100/60">
                                Current Status
                            </p>

                            <div className="mt-5 flex items-center justify-center gap-4">

                                <span className="text-4xl">
                                    {currentStatus.emoji}
                                </span>

                                <h2
                                    className="text-4xl font-bold"
                                    style={{
                                        color: currentStatus.color,
                                    }}
                                >
                                    {patient.status}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default TrackPatient;