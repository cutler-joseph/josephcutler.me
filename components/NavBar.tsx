"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/running", label: "The Grid" },
    { href: "/vault", label: "The Vault" },
    { href: "/forge", label: "The Forge" },
    { href: "/about", label: "About" },
];

export default function NavBar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const status = useMemo(() => "Currently", []);

    return (
        <div className="fixed top-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 px-2">
            <nav className="relative flex items-center justify-between rounded-full border border-white/15 bg-[#0D0D0D]/90 px-5 py-3 backdrop-blur-sm">

            {/* Left brand */}
                <Link
                    href="/"
                    className="text-sm font-semibold text-white/90 hover:text-white transition"
                >
                    Joseph Cutler
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-5">
                    {navItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm transition ${
                                    isActive ? "text-[#FF8200]" : "text-white/70 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side: status (desktop) + hamburger (mobile) */}
                <div className="flex items-center gap-2">
                    <div className="hidden md:block rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                        {status}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden rounded-full border border-white/10 px-3 py-2 text-xs text-white/80 hover:text-white transition"
                        aria-label="Open menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {/* simple hamburger */}
                        <span className="block h-[2px] w-4 bg-white/80 mb-1" />
                        <span className="block h-[2px] w-4 bg-white/80 mb-1" />
                        <span className="block h-[2px] w-4 bg-white/80" />
                    </button>
                </div>

                {/* Mobile dropdown panel */}
                <div
                    className={`md:hidden absolute left-0 right-0 top-[calc(100%+0.75rem)] overflow-hidden rounded-2xl border border-white/10 bg-black/95 backdrop-blur transition-all duration-200 ${
                        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="p-3">
                        <div className="mb-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/70">
                            {status}
                        </div>

                        <div className="flex flex-col">
                            {navItems.map((item) => {
                                const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`rounded-xl px-3 py-3 text-sm transition ${
                                            isActive
                                                ? "bg-white/5 text-[#FF8200]"
                                                : "text-white/85 hover:bg-white/5"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
