import { useEffect, useState } from "react";
import { Hospital, ShieldCheck, Lock, HeartPulse } from "lucide-react";

const ADMIN_KEY = "hospital-admin-auth";

export default function AdminGate({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        if (sessionStorage.getItem(ADMIN_KEY) === "true") {
            setAuthenticated(true);
        }

        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            sessionStorage.setItem(ADMIN_KEY, "true");
            setAuthenticated(true);
            return;
        }

        setPassword("");
        setError("Incorrect administrator password.");
    };

    if (authenticated) return children;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08140F] px-6">

            {/* Background */}

            <div className="absolute inset-0">

                <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-700/20 blur-3xl" />

                <div className="absolute -right-20 bottom-0 h-[32rem] w-[32rem] rounded-full bg-green-500/10 blur-3xl" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)]" />

                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.03]
                        [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)]
                        [background-size:45px_45px]
                    "
                />

            </div>

            {/* Card */}

            <div
                className="
                    relative
                    w-full
                    max-w-md

                    overflow-hidden

                    rounded-3xl

                    border
                    border-emerald-700/30

                    bg-white/5
                    backdrop-blur-xl

                    shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                "
            >

                {/* Top Accent */}

                <div className="h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400" />

                <div className="p-10">

                    {/* Logo */}

                    <div className="flex justify-center">

                        <div
                            className="
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center

                                rounded-3xl

                                bg-gradient-to-br
                                from-emerald-500
                                to-green-700

                                shadow-xl
                                shadow-emerald-900/50
                            "
                        >
                            <Hospital
                                size={38}
                                className="text-white"
                            />
                        </div>

                    </div>

                    {/* Title */}

                    <div className="mt-6 text-center">

                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Smart Digital Hospital
                        </h1>

                        <p className="mt-2 text-sm text-green-200">
                            Administration Portal
                        </p>

                    </div>

                    {/* Status */}

                    <div
                        className="
                            mt-8

                            flex
                            items-center
                            justify-center
                            gap-3

                            rounded-2xl

                            border
                            border-green-700/30

                            bg-[#10261D]

                            py-3
                        "
                    >

                        <HeartPulse
                            className="animate-pulse text-emerald-400"
                            size={20}
                        />

                        <span className="font-medium text-green-200">
                            Secure Hospital Network
                        </span>

                    </div>

                    {/* Form */}

                    <form
                        onSubmit={handleLogin}
                        className="mt-8 space-y-5"
                    >

                        <div>

                            <label className="mb-2 block text-sm font-medium text-green-100">
                                Administrator Password
                            </label>

                            <div className="relative">

                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400"
                                    size={18}
                                />

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="Enter secure password"
                                    className="
                                        w-full

                                        rounded-2xl

                                        border
                                        border-green-700/30

                                        bg-[#11281F]

                                        py-3
                                        pl-12
                                        pr-4

                                        text-white

                                        placeholder:text-gray-500

                                        outline-none

                                        transition

                                        focus:border-emerald-500
                                        focus:ring-2
                                        focus:ring-emerald-500/20
                                    "
                                />

                            </div>

                        </div>

                        {error && (

                            <div
                                className="
                                    rounded-xl

                                    border
                                    border-red-700/30

                                    bg-red-500/10

                                    px-4
                                    py-3

                                    text-sm
                                    text-red-300
                                "
                            >
                                {error}
                            </div>

                        )}

                        <button
                            type="submit"
                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2

                                rounded-2xl

                                bg-gradient-to-r
                                from-emerald-600
                                to-green-600

                                py-3

                                font-semibold
                                text-white

                                transition-all

                                hover:scale-[1.02]
                                hover:shadow-xl
                                hover:shadow-emerald-900/40
                            "
                        >

                            <ShieldCheck size={20} />

                            Access Dashboard

                        </button>

                    </form>

                    {/* Footer */}

                    <div className="mt-10 border-t border-white/10 pt-6">

                        <div className="flex justify-between text-xs text-gray-400">

                            <span>
                                {time.toLocaleDateString()}
                            </span>

                            <span>
                                {time.toLocaleTimeString()}
                            </span>

                        </div>

                        <p className="mt-4 text-center text-xs text-gray-500">
                            Smart Digital Hospital Token Management System
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}