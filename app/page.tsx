import Link from "next/link";
import CurrentlyTicker from "@/components/CurrentlyTicker";

export default function HomePage() {
    return (
        <div className="space-y-10">
            {/* Hero */}
            <section className="space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight">Joseph Cutler</h1>

                <p className="text-lg text-white/80">
                    Runner · Theme Park Enthusiast · Sports Fanatic · Vol For Life
                </p>


            </section>

            {/* Quick Links */}
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { title: "The Grid", desc: "PRs, races, and training logs.", href: "/running" },
                    { title: "The Vault", desc: "Jersey collection & future fits.", href: "/vault" },
                    { title: "The Forge", desc: "Projects, experiments, and builds.", href: "/forge" },
                ].map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className="group rounded-xl border border-white/10 p-5 transition hover:border-[#FF8200]/60 hover:bg-white/[0.03] hover:-translate-y-0.5 cursor-pointer"
                    >
                        <div className="text-xl font-semibold transition group-hover:text-white">{card.title}</div>

                        <div className="pt-2 text-sm text-white/70">{card.desc}</div>
                    </Link>
                ))}
            </section>

            {/* Ticker placeholder (we’ll build the animated version later) */}
            <CurrentlyTicker />

        </div>
    );
}
