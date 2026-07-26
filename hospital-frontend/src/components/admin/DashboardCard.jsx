import {
    Users,
    Clock3,
    Megaphone,
    Stethoscope,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const iconMap = {
    total: Users,
    waiting: Clock3,
    called: Megaphone,
    consultation: Stethoscope,
    completed: CheckCircle2,
    cancelled: XCircle,
};

const colorMap = {
    green: {
        icon: "bg-green-500/15 text-green-400",
        value: "text-green-400",
        border: "hover:border-green-500/50",
    },
    yellow: {
        icon: "bg-amber-500/15 text-amber-400",
        value: "text-amber-400",
        border: "hover:border-amber-500/50",
    },
    blue: {
        icon: "bg-cyan-500/15 text-cyan-400",
        value: "text-cyan-400",
        border: "hover:border-cyan-500/50",
    },
    purple: {
        icon: "bg-violet-500/15 text-violet-400",
        value: "text-violet-400",
        border: "hover:border-violet-500/50",
    },
    red: {
        icon: "bg-red-500/15 text-red-400",
        value: "text-red-400",
        border: "hover:border-red-500/50",
    },
};

export default function DashboardCard({
    title,
    value,
    color = "green",
    type = "total",
}) {
    const Icon = iconMap[type];
    const theme = colorMap[color];

    return (
        <div
            className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-[#214131]
                bg-[#13231B]
                px-6
                py-5
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:shadow-green-950/20
                ${theme.border}
            `}
        >
            {/* Accent Line */}

            <div
                className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-1
                    ${color === "green" ? "bg-green-500" : ""}
                    ${color === "yellow" ? "bg-amber-400" : ""}
                    ${color === "blue" ? "bg-cyan-400" : ""}
                    ${color === "purple" ? "bg-violet-400" : ""}
                    ${color === "red" ? "bg-red-400" : ""}
                `}
            />

            <div className="flex items-center justify-between">

                <div className="min-w-0">

                    <p className="text-sm font-medium tracking-wide text-gray-400">
                        {title}
                    </p>

                    <h2
                        className={`
                            mt-2
                            text-4xl
                            font-bold
                            leading-none
                            ${theme.value}
                        `}
                    >
                        {value}
                    </h2>

                </div>

                <div
                    className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        transition-transform
                        duration-200
                        group-hover:scale-105
                        ${theme.icon}
                    `}
                >
                    <Icon size={22} strokeWidth={2.2} />
                </div>

            </div>
        </div>
    );
}