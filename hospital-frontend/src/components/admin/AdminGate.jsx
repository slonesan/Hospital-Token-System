import { useEffect, useState } from "react";

const ADMIN_KEY = "hospital-admin-auth";

export default function AdminGate({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem(ADMIN_KEY) === "true") {
            setAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            sessionStorage.setItem(ADMIN_KEY, "true");
            setAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password.");
            setPassword("");
        }
    };

    if (authenticated) return children;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-green-100 p-8">

                <div className="text-center mb-8">

                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                        🏥
                    </div>

                    <h1 className="text-3xl font-bold text-green-700">
                        Smart Digital Hospital
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Administration Portal
                    </p>

                    <p className="mt-4 text-sm text-gray-400">
                        Authorized hospital staff only.
                    </p>

                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Admin Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        Access Dashboard
                    </button>

                </form>

                <div className="mt-8 border-t pt-4 text-center text-xs text-gray-400">
                    Smart Digital Hospital Token System
                </div>

            </div>
        </div>
    );
}