import Image from "next/image";
import Link from "next/link";

type GearStatus = "Current" | "Testing" | "Race Day" | "Retired";

function GearImageCard({
                           title,
                           image,
                           role,
                           status,
                           href,
                           buyHref,
                           buyLabel = "View product",
                       }: {
    title: string;
    image: string;
    role: string;
    status?: GearStatus;
    href: string;
    buyHref?: string;
    buyLabel?: string;
}) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-[#FF8200]/60 hover:bg-white/[0.05]">
            {/* Internal navigation */}
            <Link
                href={href}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8200]/70"
            >
                <div className="relative aspect-[4/3] w-full bg-black/20">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition group-hover:scale-[1.03]"
                    />
                </div>

                <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-white transition group-hover:text-[#FF8200]">
                                {title}
                            </div>

                            <div className="mt-1 text-xs text-white/60">{role}</div>
                        </div>

                        {status ? (
                            <div className="shrink-0 rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 text-[11px] text-white/70">
                                {status}
                            </div>
                        ) : null}
                    </div>
                </div>
            </Link>

            {/* External purchase link */}
            {buyHref ? (
                <div className="border-t border-white/10 px-4 py-3">
                    <a
                        href={buyHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-white/60 transition hover:text-[#FF8200]"
                    >
                        {buyLabel}
                        <span aria-hidden>↗</span>
                    </a>
                </div>
            ) : null}
        </div>
    );
}

function ShoeDetail({
                        id,
                        name,
                        description,
                        bullets,
                    }: {
    id: string;
    name: string;
    description: string;
    bullets: string[];
}) {
    return (
        <section
            id={id}
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-semibold text-white">{name}</div>
                <Link
                    href="#top"
                    className="text-xs text-white/50 transition hover:text-[#FF8200]"
                >
                    Back to top
                </Link>
            </div>

            <p className="mt-2 max-w-2xl text-sm text-white/70">{description}</p>

            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/70">
                {bullets.map((b) => (
                    <li key={b}>{b}</li>
                ))}
            </ul>
        </section>
    );
}

export default function ShoesPage() {
    return (
        <main id="top" className="mx-auto w-full max-w-5xl px-4 pb-16 pt-0">
            {/* Header */}
            <section className="space-y-3">
                <h1 className="text-4xl font-bold">Shoes</h1>
                <p className="max-w-2xl text-white/70">
                    My footwear rotation. What I use daily, what I test, and what I save
                    for race day when it’s time to lock in.
                </p>
            </section>

            {/* Rotation */}
            <section className="mt-10">
                <div className="mb-3 flex items-end justify-between gap-3">
                    <h2 className="text-sm font-semibold text-white">Rotation</h2>
                    <div className="text-xs text-white/60">
                        Tap a card to jump to details
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <GearImageCard
                        title="Brooks Ghost Max 3"
                        role="Daily trainer • Long runs"
                        status="Current"
                        image="/images/gear/ghost-max-3.jpg"
                        href="/running/gear/shoes#ghost-max-3"
                        buyHref="https://www.brooksrunning.com/en_us/mens/shoes/road-running-shoes/ghost-max-3/1104641D887.080.html?tid=sem%3AGOOGLE%3AUSA%7CGoogle%7CShopping%7CBrand%7CFootwear%7CActive%20Evaluators%3AFootwear%3A_shopping&gclsrc=aw.ds&gad_source=1&gad_campaignid=23011678042&gbraid=0AAAAAD--avAagF97iQm3IM8EN-7nQze61&gclid=CjwKCAiAvaLLBhBFEiwAYCNTf6rfOw5HJzAfqfqSYd_H7WP-BOopBUFKfl4jIdgHetXXWG4qQUqrbxoCl-EQAvD_BwE"
                        buyLabel="View on Brooks"
                    />

                    <GearImageCard
                        title="Nike Zoom Fly 6"
                        role="Tempo shoe • Faster efforts"
                        status="Testing"
                        image="/images/gear/zoom-fly-6.jpg"
                        href="/running/gear/shoes#zoom-fly-6"
                        buyHref="https://www.nike.com/t/zoom-fly-6-mens-road-racing-shoes-wn2ALjkm/FN8454-104"
                        buyLabel="View on Nike"
                    />

                    <GearImageCard
                        title="Nike Alphafly 3"
                        role="Race day • PR attempts"
                        status="Race Day"
                        image="/images/gear/alphafly-3.jpg"
                        href="/running/gear/shoes#alphafly-3"
                        buyHref="https://www.nike.com/t/alphafly-3-mens-road-racing-shoes-5gZBgL/FD8311-101"
                        buyLabel="View on Nike"
                    />

                    <GearImageCard
                        title="Nike Vomero Plus"
                        role="Cushion trainer • Easy miles"
                        status="Current"
                        image="/images/gear/vomero-plus.jpg"
                        href="/running/gear/shoes#vomero-plus"
                        buyHref="https://www.nike.com/t/vomero-plus-mens-road-running-shoes-5npsVBwT/HV8150-003"
                        buyLabel="View on Nike"
                    />
                </div>
            </section>

            {/* Details */}
            <section className="mt-12 grid gap-4">
                <ShoeDetail
                    id="ghost-max-3"
                    name="Brooks Ghost Max 3"
                    description="My comfort-first workhorse. When the goal is steady miles, low wobble, and a smooth ride, this is the one I trust."
                    bullets={[
                        "Primary long-run shoe",
                        "Stable underfoot for easy days",
                        "Great for tired legs and recovery runs",
                    ]}
                />

                <ShoeDetail
                    id="zoom-fly-6"
                    name="Nike Zoom Fly 6"
                    description="The ‘let’s pick it up’ shoe. Built for faster days where I want structure and snap without going full carbon race mode."
                    bullets={[
                        "Tempo runs and workouts",
                        "Good bridge between trainers and supershoes",
                        "Used when pace is the point",
                    ]}
                />

                <ShoeDetail
                    id="alphafly-3"
                    name="Nike Alphafly 3"
                    description="Race-day weaponry. This is reserved for the days I want the most help possible from the shoe, especially for longer distances."
                    bullets={[
                        "Race-day only (ideally)",
                        "PR attempts and key events",
                        "Best when efficiency matters most",
                    ]}
                />

                <ShoeDetail
                    id="vomero-plus"
                    name="Nike Vomero Plus"
                    description="Soft and protective for easy miles. This lives in the ‘cruise control’ lane when I want cushion and comfort above all else."
                    bullets={[
                        "Easy and moderate runs",
                        "Cushion-focused daily mileage",
                        "Good option when I want a plush ride",
                    ]}
                />
            </section>
        </main>
    );
}
