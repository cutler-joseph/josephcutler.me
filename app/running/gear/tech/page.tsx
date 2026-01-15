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

function TechDetail({
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

export default function TechPage() {
    return (
        <main id="top" className="mx-auto w-full max-w-5xl px-4 pb-16 pt-0">
            {/* Header */}
            <section className="space-y-3">
                <h1 className="text-4xl font-bold">Tech</h1>
                <p className="max-w-2xl text-white/70">
                    The gear I run with (and the gear that runs with me). Tracking,
                    audio, and eyewear that shows up on race mornings.
                </p>
            </section>

            {/* Loadout */}
            <section className="mt-10">
                <div className="mb-3 flex items-end justify-between gap-3">
                    <h2 className="text-sm font-semibold text-white">Loadout</h2>
                    <div className="text-xs text-white/60">Tap a card to jump to details</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <GearImageCard
                        title="Apple Watch Ultra (1st Gen)"
                        role="Tracking • Training + race day"
                        status="Current"
                        image="/images/gear/apple-watch-ultra-1.jpg"
                        href="/running/gear/tech#apple-watch-ultra-1"
                        buyHref="https://www.apple.com/shop/buy-watch/apple-watch-ultra/49mm-cellular-natural-titanium-anchor-blue-ocean-band?afid=p240%7Cgo~cmp-23258041668~adg-6631920899~ad-_~dev-c~ext-~prd-MEWH4LW%2FA~mca-3622330~nt-&cid=aos-us-kwgo-pla-watch-pmax_pla--product-MEWH4LW%2FA"
                        buyLabel="View on Apple"
                    />

                    <GearImageCard
                        title="Oakley Meta Vanguard"
                        role="Eyewear • Sun + style"
                        status="Current"
                        image="/images/gear/oakley-meta-vanguard.jpg"
                        href="/running/gear/tech#oakley-meta-vanguard"
                        buyHref="https://www.meta.com/ai-glasses/oakley-meta-vanguard-black-prizm-24k/?utm_source=gg&utm_medium=pla&utm_campaign=22855117867&utm_term&utm_content&utm_ad&utm_location=9011798&utm_location2&utm_placement&utm_device=c&utm_matchtype&utm_feed&utm_adposition&utm_product=SK-1001204-01-US&ads_rl=9213737374&&gclsrc=aw.ds&gad_source=1&gad_campaignid=22855181452&gbraid=0AAAAAo_xvTkibS0fG7b0HE5hI8TxUcbye&gclid=CjwKCAiAvaLLBhBFEiwAYCNTf4OQVGqhkl2dl_psDKO9LURBlisSeuso0DGTtmUbCvAhZ2Psu_8FXRoCBSwQAvD_BwE"
                        buyLabel="View on Meta"
                    />

                    <GearImageCard
                        title="Powerbeats Pro"
                        role="Audio • Long runs + workouts"
                        status="Current"
                        image="/images/gear/powerbeats-pro.jpg"
                        href="/running/gear/tech#powerbeats-pro"
                        buyHref="https://www.amazon.com/Beats-Powerbeats-Wireless-Bluetooth-Earbuds/dp/B0DT2LTRL7?th=1"
                        buyLabel="View on Amazon"
                    />
                </div>
            </section>

            {/* Details */}
            <section className="mt-12 grid gap-4">
                <TechDetail
                    id="apple-watch-ultra-1"
                    name="Apple Watch Ultra (1st Gen)"
                    description="My run command center. Reliable GPS, easy mid-run checks, and it keeps my training honest without me having to think too hard."
                    bullets={[
                        "Primary run tracker",
                        "Great for pacing and splits",
                        "Lives on my wrist for training and race day",
                    ]}
                />

                <TechDetail
                    id="oakley-meta-vanguard"
                    name="Oakley Meta Vanguard"
                    description="Sun protection with personality. This is the piece that makes a run feel like an event, especially on bright Florida days."
                    bullets={[
                        "My go-to sunglasses for runs",
                        "Comfort + coverage in bright conditions",
                        "Also just looks ridiculously good in photos",
                    ]}
                />

                <TechDetail
                    id="powerbeats-pro"
                    name="Powerbeats Pro"
                    description="My reliable audio setup for long runs and workouts. Secure fit, solid battery life, and they stay put when I’m moving."
                    bullets={[
                        "Workout and long-run audio",
                        "Secure fit for sweat and motion",
                        "Great for playlists, podcasts, and race-week hype",
                    ]}
                />
            </section>
        </main>
    );
}
