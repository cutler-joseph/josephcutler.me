import Link from "next/link";
import {
    raceItems,
    splitByStatus,
    getNextRace,
    formatDateShort,
    type RaceItem,
} from "@/lib/races";

function Chevron() {
    return (
        <svg
            className="h-4 w-4 text-white/60 transition-transform duration-200 group-open:rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function RaceRow({
                     name,
                     date,
                     distance,
                     location,
                     href,
                 }: {
    name: string;
    date: string;
    distance: string;
    location?: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="group flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-[#FF8200]/60 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8200]/70"
        >
            <div>
                <div className="text-sm font-semibold text-white transition group-hover:text-[#FF8200]">
                    {name}
                </div>
                <div className="mt-1 text-xs text-white/70">
                    {distance} • {formatDateShort(date)}
                    {location ? ` • ${location}` : ""}
                </div>
            </div>

            <div className="shrink-0 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70 transition group-hover:border-white/20 group-hover:text-white/80">
                View
            </div>
        </Link>
    );
}

function WeekendBlock({ item }: { item: Extract<RaceItem, { type: "weekend" }> }) {
    return (
        <details className="group rounded-2xl border border-white/10 bg-white/[0.03]">
            <summary className="cursor-pointer list-none px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-sm font-semibold text-white">{item.name}</div>
                        <div className="mt-1 text-xs text-white/70">
                            {item.dateRange ? item.dateRange : "Race Weekend"}
                            {item.location ? ` • ${item.location}` : ""}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="shrink-0 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                            Expand
                        </div>
                        <Chevron />
                    </div>
                </div>
            </summary>

            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                    <div className="px-5 pb-5">
                        <div className="grid gap-3">
                            {item.children.map((r) => (
                                <div key={r.slug} className="pl-2">
                                    <RaceRow
                                        name={r.name}
                                        date={r.date}
                                        distance={r.distance}
                                        location={r.location}
                                        href={`/running/races/${r.slug}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </details>
    );
}

function getItemStartDate(item: RaceItem) {
    // For weekends, use the first child’s date (assumes children are in chronological order)
    if (item.type === "weekend") return item.children[0]?.date ?? "9999-12-31";
    return item.date;
}

export default function RunningPage() {
    // raceItems is likely exported as `as const` (readonly). Create a mutable view for helpers.
    const items = raceItems as unknown as RaceItem[];

    const { upcoming, completed } = splitByStatus(items);
    const next = getNextRace(items);

    const upcomingSorted = [...upcoming].sort((a, b) =>
        getItemStartDate(a).localeCompare(getItemStartDate(b))
    );

    const completedSorted = [...completed].sort((a, b) =>
        getItemStartDate(b).localeCompare(getItemStartDate(a))
    );

    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-0">
            {/* Header */}
            <section className="space-y-3">
                <h1 className="text-4xl font-bold">The Grid</h1>
                <p className="max-w-2xl text-white/70">My dedicated race log</p>
            </section>

            {/* Next Race Spotlight */}
            <section className="mt-8">
                <div className="mb-3 flex items-end justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white">Next race</h2>
                    <div className="text-xs text-white/60" />
                </div>

                {next ? (
                    <Link
                        href={`/running/races/${next.slug}`}
                        className="group block rounded-2xl border border-[#FF8200]/20 bg-[#FF8200]/[0.08] p-6 transition hover:border-white/60 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8200]/70"
                    >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="text-sm text-white/60">Spotlight</div>
                                <div className="mt-1 text-2xl font-semibold text-[#FF8200] transition group-hover:text-white">
                                    {"parent" in next && next.parent ? next.parent.name : next.name}
                                </div>
                                <div className="mt-2 text-sm text-white/70">
                                    {"parent" in next && next.parent ? `${next.name} • ` : ""}
                                    {next.distance} • {formatDateShort(next.date)}
                                    {next.location ? ` • ${next.location}` : ""}
                                </div>
                            </div>

                            <div className="mt-3 inline-flex w-fit items-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70 sm:mt-0">
                                View
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/70">
                        No upcoming races yet. Add one in{" "}
                        <span className="text-white">lib/races.ts</span> and it’ll show up
                        here automatically.
                    </div>
                )}
            </section>

            {/* Race Log */}
            <section className="mt-10">
                <div className="mb-3 flex items-end justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white">Race log</h2>
                </div>

                <div className="grid gap-4">
                    {/* Upcoming */}
                    <details className="group rounded-2xl border border-white/10 bg-white/[0.03]">
                        <summary className="cursor-pointer list-none px-5 py-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-sm font-semibold text-white">Upcoming</div>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                                        {upcomingSorted.length}
                                    </div>
                                    <Chevron />
                                </div>
                            </div>
                        </summary>

                        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                            <div className="overflow-hidden">
                                <div className="px-5 pb-5">
                                    {upcomingSorted.length === 0 ? (
                                        <div className="text-sm text-white/70">Nothing upcoming yet.</div>
                                    ) : (
                                        <div className="grid gap-3">
                                            {upcomingSorted.map((item) =>
                                                item.type === "race" ? (
                                                    <RaceRow
                                                        key={item.slug}
                                                        name={item.name}
                                                        date={item.date}
                                                        distance={item.distance}
                                                        location={item.location}
                                                        href={`/running/races/${item.slug}`}
                                                    />
                                                ) : (
                                                    <WeekendBlock key={item.slug} item={item} />
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </details>

                    {/* Completed */}
                    <details className="group rounded-2xl border border-white/10 bg-white/[0.03]">
                        <summary className="cursor-pointer list-none px-5 py-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-sm font-semibold text-white">Completed</div>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                                        {completedSorted.length}
                                    </div>
                                    <Chevron />
                                </div>
                            </div>
                        </summary>

                        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                            <div className="overflow-hidden">
                                <div className="px-5 pb-5">
                                    {completedSorted.length === 0 ? (
                                        <div className="text-sm text-white/70">
                                            No completed races logged yet.
                                        </div>
                                    ) : (
                                        <div className="grid gap-3">
                                            {completedSorted.map((item) =>
                                                item.type === "race" ? (
                                                    <RaceRow
                                                        key={item.slug}
                                                        name={item.name}
                                                        date={item.date}
                                                        distance={item.distance}
                                                        location={item.location}
                                                        href={`/running/races/${item.slug}`}
                                                    />
                                                ) : (
                                                    <WeekendBlock key={item.slug} item={item} />
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </section>

            {/* Gear */}
            <section className="mt-10">
                <div className="mb-3 flex items-end justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white">Gear loadout</h2>
                    <div className="text-xs text-white/60">Race-day focused</div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            title: "Shoes",
                            body: "Primary race shoes, alternates, and what I use by distance.",
                            href: "/running/gear/shoes",
                        },
                        {
                            title: "Tech",
                            body: "Watch, sunglasses, audio, and how I track my runs.",
                            href: "/running/gear/tech",
                        },
                        {
                            title: "Race Day Essentials",
                            body: "Fuel, socks, anti-chafe, bib tools, and the non-negotiables.",
                            href: "/running/gear/essentials",
                        },
                    ].map((c) => (
                        <Link
                            key={c.title}
                            href={c.href}
                            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#FF8200]/60 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8200]/70"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold text-white transition group-hover:text-[#FF8200]">
                                        {c.title}
                                    </div>
                                    <div className="mt-2 text-sm text-white/70">{c.body}</div>
                                </div>

                                <div className="shrink-0 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70 transition group-hover:border-white/20 group-hover:text-white/80">
                                    View
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
