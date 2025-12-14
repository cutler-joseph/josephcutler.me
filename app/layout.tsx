import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
    title: "Joseph Cutler",
    description: "Runner · Theme Park Enthusiast · Sports Fanatic · Vol For Life",
};

const navItems = [
    { href: "/", label: "Home" },
    { href: "/running", label: "The Grid" },
    { href: "/vault", label: "The Vault" },
    { href: "/forge", label: "The Forge" },
    { href: "/about", label: "About" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen">
        {/* Floating Nav */}
            <NavBar />




        {/* Main content */}
        <main className="mx-auto max-w-5xl px-6 pt-28 pb-20">
            {children}
        </main>

        {/* Footer (no “made with”) */}
        <footer className="border-t border-white/10 py-8">
            <div className="mx-auto max-w-5xl px-6 text-sm text-white/60">
                © {new Date().getFullYear()} Joseph Cutler
            </div>
        </footer>
        </body>
        </html>
    );
}
