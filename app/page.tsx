import Link from "next/link";
import CurrentlyTicker from "@/components/CurrentlyTicker";

export default function HomePage() {
    return (
        <div className="space-y-10">
            {/* Hero */}
            <section className="space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight">Joseph Cutler</h1>

                <p className="text-white/70">
                    Runner · Theme Park Enthusiast ·{" "}
                    <span className="text-[#FF8200] font-semibold">Vol</span> For Life
                </p>



            </section>

            {/* Quick Links */}
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { title: "The Grid", desc: "PRs, races, and training logs.", href: "/running" },
                    { title: "The Vault", desc: "Jersey collection & future fits.", href: "/vault", featured: true },
                    { title: "The Forge", desc: "Projects, experiments, and builds.", href: "/forge" },
                ].map((card) => (
                    <Link
                        key={card.title}
                        href={card.href}
                        className={`group rounded-xl border p-5 transition cursor-pointer hover:-translate-y-0.5 
        ${
                            card.featured
                                ? // Featured card: orange by default → grey on hover
                                "border-[#FF8200]/10 bg-[#FF8200]/[0.08] hover:bg-white/[0.03] hover:border-white/60"
                                : // Normal cards: grey by default → orange on hover
                                "border-white/10 bg-white/[0.03] hover:border-[#FF8200]/60 hover:bg-[#FF8200]/[0.05]"
                        }
      `}
                    >
                        <div
                            className={`text-xl font-semibold transition
          ${
                                card.featured
                                    ? "text-[#FF8200] group-hover:text-white"
                                    : "text-white group-hover:text-[#FF8200]"
                            }
        `}
                        >
                            {card.title}
                        </div>

                        <div className="pt-2 text-sm text-white/70">
                            {card.desc}
                        </div>
                    </Link>
                ))}
            </section>


            {/* Ticker placeholder (we’ll build the animated version later) */}
            <CurrentlyTicker />

        </div>
    );
}
