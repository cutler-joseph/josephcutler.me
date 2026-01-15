import Link from "next/link";
import { raceItems, type RaceItem } from "@/lib/races";

function findRaceBySlug(slug: string) {
    for (const item of raceItems as RaceItem[]) {
        if (item.type === "race" && item.slug === slug) return item;

        if (item.type === "weekend") {
            const match = item.children.find((c) => c.slug === slug);
            if (match) return match;
        }
    }
    return null;
}

export default async function RacePage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const race = findRaceBySlug(slug);

    if (!race) {
        return (
            <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-0">
                <section className="space-y-3">
                    <h1 className="text-4xl font-bold">Race not found</h1>
                    <p className="max-w-2xl text-white/70">
                        This race doesn’t exist in the dataset yet.
                    </p>
                </section>

                <div className="mt-8">
                    <Link
                        href="/running"
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:border-[#FF8200]/60 hover:text-[#FF8200]"
                    >
                        ← Back to The Grid
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-0">
            {/* Header */}
            <section className="space-y-3">
                <div className="text-xs text-white/60">Race page (placeholder)</div>
                <h1 className="text-4xl font-bold">{race.name}</h1>
                <p className="max-w-2xl text-white/70">
                    This page is coming soon. For now, the log is accurate and the detail
                    pages will be filled in over time.
                </p>
            </section>

            {/* Quick meta */}
            <section className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs text-white/60">Date</div>
                    <div className="mt-1 text-sm font-semibold text-white">{race.date}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs text-white/60">Distance</div>
                    <div className="mt-1 text-sm font-semibold text-white">{race.distance}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs text-white/60">Location</div>
                    <div className="mt-1 text-sm font-semibold text-white">
                        {race.location ?? "TBD"}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="mt-10">
                <Link
                    href="/running"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:border-[#FF8200]/60 hover:text-[#FF8200]"
                >
                    ← Back to The Grid
                </Link>
            </div>
        </main>
    );
}
