"use client";

import { useMemo, useState } from "react";

const items = [
    "Training for upcoming race weekends",
    "Building josephcutler.me",
    "Expanding The Vault",
    "Experimenting in The Forge",
    "Logging new PRs",
    "Vols season prep",
    "Dialing in the kit",
];

export default function CurrentlyTicker() {
    const [hovered, setHovered] = useState(false);

    const tickerText = useMemo(() => {
        // Repeat the items so it scrolls smoothly
        const base = items.join(" • ");
        return `${base} • ${base} • ${base}`;
    }, []);

    return (
        <div
            className="rounded-xl border border-white/10 bg-black/30 backdrop-blur transition-all duration-300"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Ticker strip */}
            <div className="overflow-hidden px-4 py-3">
                <div
                    className={`flex w-max gap-3 text-sm text-white/70 ${
                        hovered ? "animate-none" : "animate-marquee"
                    }`}
                    style={{ willChange: "transform" }}
                >
                    <span className="font-semibold text-white/80">CURRENTLY</span>
                    <span>•</span>
                    <span>{tickerText}</span>
                </div>
            </div>

            {/* Expand panel on hover */}
            <div
                className={`grid transition-all duration-300 ${
                    hovered ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden border-t border-white/10">
                    <div className="px-4 py-4 text-sm text-white/75">
                        <div className="mb-2 font-semibold text-white/85">CURRENTLY</div>
                        <ul className="list-disc space-y-1 pl-5">
                            {items.map((t) => (
                                <li key={t}>{t}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
