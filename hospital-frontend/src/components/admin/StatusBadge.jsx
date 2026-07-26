import {
    Clock3,
    Megaphone,
    Stethoscope,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const statusConfig = {
    Waiting: {
        icon: Clock3,
        className:
            "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    },

    Called: {
        icon: Megaphone,
        className:
            "bg-sky-500/15 text-sky-300 border border-sky-500/30",
    },

    "In Consultation": {
        icon: Stethoscope,
        className:
            "bg-violet-500/15 text-violet-300 border border-violet-500/30",
    },

    Completed: {
        icon: CheckCircle2,
        className:
            "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    },

    Cancelled: {
        icon: XCircle,
        className:
            "bg-red-500/15 text-red-300 border border-red-500/30",
    },
};

export default function StatusBadge({ status }) {
    const config = statusConfig[status];

    if (!config) {
        return (
            <span className="inline-flex items-center rounded-lg border border-gray-700 bg-gray-700/20 px-3 py-1.5 text-xs font-medium text-gray-300">
                {status}
            </span>
        );
    }

    const Icon = config.icon;

    return (
        <span
            className={`
                inline-flex
                items-center
                gap-2
                rounded-lg
                px-3
                py-1.5
                text-xs
                font-semibold
                whitespace-nowrap
                transition-all
                duration-200
                ${config.className}
            `}
        >
            <Icon size={13} strokeWidth={2.3} />

            {status}
        </span>
    );
}