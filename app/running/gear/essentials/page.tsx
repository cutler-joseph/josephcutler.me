export default function EssentialsPage() {
    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-0">
            <section className="space-y-3">
                <h1 className="text-4xl font-bold">Race Day Essentials</h1>
                <p className="max-w-2xl text-white/70">
                    The non-negotiables I rely on for race day — the small things
                    that make a big difference.  Full list coming soon!!
                </p>
            </section>

            <section className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-sm font-semibold text-white">Fuel & comfort</div>
                    <p className="mt-2 text-sm text-white/70">
                        Nutrition, hydration, anti-chafe, and comfort-focused essentials.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-sm font-semibold text-white">Logistics & rituals</div>
                    <p className="mt-2 text-sm text-white/70">
                        Bib tools, socks, prep habits, and race-morning routines.
                    </p>
                </div>
            </section>
        </main>
    );
}
