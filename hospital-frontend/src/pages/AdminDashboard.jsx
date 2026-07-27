import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/admin/Header";
import DashboardCard from "../components/admin/DashboardCard";
import PatientTable from "../components/admin/PatientTable";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
        try {
            const res = await axios.get(API_URL);
            setPatients(res.data.patients);
        } catch (err) {
            console.error("Failed to fetch patients:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (token, status) => {
        try {
            await axios.patch(`${API_URL}/${token}/status`, {
                status,
            });

            fetchPatients();
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    useEffect(() => {
        fetchPatients();

        const interval = setInterval(fetchPatients, 3000);

        return () => clearInterval(interval);
    }, []);

    const total = patients.length;

    const waiting = patients.filter(
        (p) => p.status === "Waiting"
    ).length;

    const called = patients.filter(
        (p) => p.status === "Called"
    ).length;

    const consultation = patients.filter(
        (p) => p.status === "In Consultation"
    ).length;

    const completed = patients.filter(
        (p) => p.status === "Completed"
    ).length;

    const cancelled = patients.filter(
        (p) => p.status === "Cancelled"
    ).length;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0C1C14] via-[#0F2318] to-[#09120D] flex items-center justify-center">
                <div className="text-2xl font-semibold text-green-400 animate-pulse">
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0C1C14] via-[#102319] to-[#09120D] text-white">

            {/* Background Glow */}

            <div className="absolute -top-52 -left-44 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[140px]" />

            <div className="absolute bottom-0 -right-44 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[160px]" />

            <div className="relative mx-auto max-w-[1600px] px-10 py-8">

                <Header onRefresh={fetchPatients} />

                {/* Queue */}

                <section className="mb-14">

                    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div>

                            <h2 className="text-3xl font-bold">
                                Patient Queue
                            </h2>

                            <p className="mt-1 text-green-100/70">
                                Monitor patients and manage the consultation queue in real time.
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300">
                                Waiting • {waiting}
                            </div>

                            <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300">
                                Called • {called}
                            </div>

                            <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                                Consultation • {consultation}
                            </div>

                        </div>

                    </div>

                    <PatientTable
                        patients={patients}
                        onRefresh={fetchPatients}
                        onStatusChange={updateStatus}
                    />

                </section>

                {/* Summary */}

                <section>

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold">
                            Today's Summary
                        </h2>

                        <p className="mt-1 text-green-100/70">
                            Live statistics from today's patient registrations.
                        </p>

                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                        <DashboardCard
                            title="Total Patients"
                            value={total}
                            type="total"
                            color="green"
                        />

                        <DashboardCard
                            title="Waiting"
                            value={waiting}
                            type="waiting"
                            color="yellow"
                        />

                        <DashboardCard
                            title="Called"
                            value={called}
                            type="called"
                            color="blue"
                        />

                        <DashboardCard
                            title="Consultation"
                            value={consultation}
                            type="consultation"
                            color="purple"
                        />

                        <DashboardCard
                            title="Completed"
                            value={completed}
                            type="completed"
                            color="green"
                        />

                        <DashboardCard
                            title="Cancelled"
                            value={cancelled}
                            type="cancelled"
                            color="red"
                        />

                    </div>

                </section>

            </div>

        </div>
    );
}