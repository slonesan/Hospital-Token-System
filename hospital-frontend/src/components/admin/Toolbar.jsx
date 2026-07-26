import { Search, RefreshCw } from "lucide-react";

export default function Toolbar({
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
    totalPatients,
    onRefresh,
}) {
    return (
        <div className="bg-[#111A16] border border-[#214131] rounded-2xl p-6 mb-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Patient Queue
                    </h2>

                    <p className="text-gray-400 mt-1">
                        {totalPatients} registered patient{totalPatients !== 1 ? "s" : ""}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                            type="text"
                            placeholder="Search patient..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#16231D] border border-[#214131] rounded-xl pl-10 pr-4 py-2.5 w-64 focus:border-green-500 outline-none"
                        />

                    </div>

                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="bg-[#16231D] border border-[#214131] rounded-xl px-4 py-2.5 focus:border-green-500 outline-none"
                    >
                        <option>All Departments</option>
                        <option>Cardiology</option>
                        <option>Dermatology</option>
                        <option>ENT</option>
                        <option>Neurology</option>
                        <option>Orthopedics</option>
                    </select>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-[#16231D] border border-[#214131] rounded-xl px-4 py-2.5 focus:border-green-500 outline-none"
                    >
                        <option>All Status</option>
                        <option>Waiting</option>
                        <option>Called</option>
                        <option>In Consultation</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>

                    <button
                        onClick={onRefresh}
                        className="bg-green-600 hover:bg-green-500 transition px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>

                </div>

            </div>

        </div>
    );
}