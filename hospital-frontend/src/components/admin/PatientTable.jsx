import { useMemo, useState } from "react";
import {
    Search,
    RefreshCw,
    UserRound,
    Users,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import { formatDate } from "../../utils/formatDate";

const statuses = [
    "Waiting",
    "Called",
    "In Consultation",
    "Completed",
    "Cancelled",
];

export default function PatientTable({
    patients,
    onRefresh,
    onStatusChange,
}) {
    const [search, setSearch] = useState("");

    const filteredPatients = useMemo(() => {
        const q = search.toLowerCase();

        return patients.filter(
            (patient) =>
                patient.name.toLowerCase().includes(q) ||
                patient.phone.includes(q) ||
                patient.token.toString().includes(q)
        );
    }, [patients, search]);

    return (
        <div className="overflow-hidden rounded-3xl border border-green-900/50 bg-[#13251B] shadow-2xl">

            {/* Toolbar */}

            <div className="border-b border-green-900/40 bg-gradient-to-r from-[#1B3C2B] to-[#163224] px-8 py-6">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-3">

                        <Users
                            size={22}
                            className="text-green-400"
                        />

                        <p className="text-sm font-medium text-green-200">

                            Showing

                            <span className="mx-1 font-semibold text-white">
                                {filteredPatients.length}
                            </span>

                            patient(s)

                        </p>

                    </div>

                    <div className="flex flex-wrap items-center gap-4">

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-green-300"
                            />

                            <input
                                type="text"
                                placeholder="Search patient, token or phone..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="
                                    w-[360px]
                                    xl:w-[420px]
                                    rounded-xl
                                    border
                                    border-green-800
                                    bg-[#214131]
                                    py-3
                                    pl-11
                                    pr-4
                                    text-white
                                    placeholder:text-green-200/50
                                    outline-none
                                    transition
                                    focus:border-green-500
                                    focus:ring-2
                                    focus:ring-green-500/20
                                "
                            />

                        </div>

                        <button
                            onClick={onRefresh}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-emerald-600
                                px-5
                                py-3
                                font-medium
                                text-white
                                transition
                                hover:bg-emerald-500
                            "
                        >
                            <RefreshCw size={18} />

                            Refresh

                        </button>

                    </div>

                </div>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-[#1C3B2B] text-xs uppercase tracking-wider text-green-200">

                        <tr>

                            <th className="w-16 px-4 py-5 text-center">
                                #
                            </th>

                            <th className="px-6 py-5 text-left">
                                Patient
                            </th>

                            <th className="px-6 py-5 text-left">
                                Token
                            </th>

                            <th className="px-6 py-5 text-left">
                                Phone
                            </th>

                            <th className="px-6 py-5 text-left">
                                Department
                            </th>

                            <th className="px-6 py-5 text-left">
                                Status
                            </th>

                            <th className="px-6 py-5 text-left">
                                Registered
                            </th>

                            <th className="px-6 py-5 text-left">
                                Update
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredPatients.map((patient, index) => {

                            const formatted =
                                formatDate(patient.createdAt);

                            const [date, time] =
                                formatted.split(",");

                            return (

                                <tr
                                    key={patient._id}
                                    className="
                                        border-t
                                        border-green-900/40
                                        transition
                                        hover:bg-[#183225]
                                    "
                                >

                                    <td className="px-4 py-5 text-center text-gray-400">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-4">

                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-green-500/15
                                                "
                                            >
                                                <UserRound
                                                    size={19}
                                                    className="text-green-400"
                                                />
                                            </div>

                                            <span className="font-semibold text-white">
                                                {patient.name}
                                            </span>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 font-mono font-semibold tracking-wide text-green-300">
                                        #{patient.token}
                                    </td>

                                    <td className="px-6 py-5 text-gray-300">
                                        {patient.phone}
                                    </td>

                                    <td className="px-6 py-5 text-gray-200">
                                        {patient.department}
                                    </td>

                                    <td className="px-6 py-5">
                                        <StatusBadge
                                            status={patient.status}
                                        />
                                    </td>

                                    <td className="px-6 py-5">

                                        <div>

                                            <p className="text-gray-300">
                                                {date}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {time?.trim()}
                                            </p>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5">

                                        <select
                                            value={patient.status}
                                            onChange={(e) =>
                                                onStatusChange(
                                                    patient.token,
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                min-w-[150px]
                                                rounded-xl
                                                border
                                                border-green-800
                                                bg-[#214131]
                                                px-4
                                                py-2.5
                                                text-white
                                                outline-none
                                                transition
                                                focus:border-green-500
                                            "
                                        >
                                            {statuses.map(
                                                (status) => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                )
                                            )}
                                        </select>

                                    </td>

                                </tr>

                            );
                        })}

                        {filteredPatients.length === 0 && (

                            <tr>

                                <td
                                    colSpan={8}
                                    className="py-24 text-center"
                                >

                                    <Users
                                        size={56}
                                        className="mx-auto mb-5 text-green-700"
                                    />

                                    <h3 className="text-xl font-semibold text-white">
                                        No Patients Found
                                    </h3>

                                    <p className="mt-3 text-gray-400">
                                        Try searching with a different patient
                                        name, token number or phone number.
                                    </p>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}