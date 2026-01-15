export type RaceStatus = "upcoming" | "completed";

export type RaceLeaf = {
    type: "race";
    slug: string;
    name: string;
    date: string; // ISO: "2025-10-24"
    distance: string; // "5K", "10K", "Half", etc.
    location?: string;
    status: RaceStatus;

    // Optional details (fill in later)
    result?: string; // "27:15" or "8:46/mi"
    notes?: string;
    stravaUrl?: string;
};

export type RaceWeekend = {
    type: "weekend";
    slug: string; // parent slug (used for grouping only)
    name: string; // "runDisney Wine & Dine Race Weekend"
    dateRange?: string; // "Nov 6–9, 2025" (display only)
    location?: string;
    status: "upcoming" | "completed";
    children: RaceLeaf[];
};

export type RaceItem = RaceLeaf | RaceWeekend;

/**
 * Your single source of truth.
 * Add races here over time. Everything else renders from this.
 */
export const raceItems: RaceItem[] = [
    {
        type: "race",
        slug: "2025-orlando-magic-5k",
        name: "2025 Orlando Magic 5K",
        date: "2025-02-01",
        distance: "5K",
        location: "Orlando, FL",
        status: "completed",
    },

    {
        type: "weekend",
        slug: "2025-rundisney-wine-dine-weekend",
        name: "2025 runDisney Wine & Dine Weekend",
        dateRange: "2025-10-24 to 2025-10-26",
        location: "Walt Disney World",
        status: "completed",
        children: [
            {
                type: "race",
                slug: "2025-wine-dine-5k",
                name: "Wine & Dine 5K",
                date: "2025-10-24",
                distance: "5K",
                location: "Walt Disney World",
                status: "completed",
            },
            {
                type: "race",
                slug: "2025-wine-dine-10k",
                name: "Wine & Dine 10K",
                date: "2025-10-25",
                distance: "10K",
                location: "Walt Disney World",
                status: "completed",
            },
            {
                type: "race",
                slug: "2025-wine-dine-half-marathon",
                name: "Wine & Dine Half Marathon",
                date: "2025-10-26",
                distance: "Half Marathon",
                location: "Walt Disney World",
                status: "completed",
            },
        ],
    },

    {
        type: "race",
        slug: "2025-skechers-hot-chocolate-run",
        name: "2025 Skechers Hot Chocolate Run",
        date: "2025-12-14",
        distance: "10K",
        location: "Tampa, FL",
        status: "completed",
    },

    {
        type: "race",
        slug: "2025-12ks-of-christmas",
        name: "12Ks of Christmas",
        date: "2025-12-20",
        distance: "12K",
        location: "Orlando, FL",
        status: "completed",
    },

    {
        type: "race",
        slug: "2026-bdr-orlando-double-challenge",
        name: "BDR Orlando Double Challenge",
        date: "2026-03-07",
        distance: "5K/10K",
        location: "Orlando, FL",
        status: "upcoming",
    },

    {
        type: "weekend",
        slug: "2026-rundisney-springtime-surprise-challenge",
        name: "2026 runDisney Springtime Surprise Challenge",
        dateRange: "2026-04-17 to 2026-04-19",
        location: "Walt Disney World",
        status: "upcoming",
        children: [
            {
                type: "race",
                slug: "2026-springtime-surprise-5k",
                name: "Springtime Surprise 5K",
                date: "2026-04-17",
                distance: "5K",
                location: "Walt Disney World",
                status: "upcoming",
            },
            {
                type: "race",
                slug: "2026-springtime-surprise-10k",
                name: "Springtime Surprise 10K",
                date: "2026-04-18",
                distance: "10K",
                location: "Walt Disney World",
                status: "upcoming",
            },
            {
                type: "race",
                slug: "2026-springtime-surprise-10-mile",
                name: "Springtime Surprise 10 Mile",
                date: "2026-04-19",
                distance: "10 Mile",
                location: "Walt Disney World",
                status: "upcoming",
            },
        ],
    },

    {
        type: "weekend",
        slug: "2026-dollywood-race-weekend",
        name: "Inaugural Run Dollywood Race Weekend",
        dateRange: "2026-04-25 to 2026-04-26",
        location: "Pigeon Forge, TN",
        status: "upcoming",
        children: [
            {
                type: "race",
                slug: "2026-dollywood-5k-10k",
                name: "Dollywood 5K/10K",
                date: "2026-04-25",
                distance: "5K/10K",
                location: "Pigeon Forge, TN",
                status: "upcoming",
            },
            {
                type: "race",
                slug: "2026-dollywood-half-marathon",
                name: "Dollywood Half Marathon",
                date: "2026-04-26",
                distance: "Half Marathon",
                location: "Pigeon Forge, TN",
                status: "upcoming",
            },
        ],
    },
];




export function formatDateShort(iso: string) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function flattenLeafRaces(items: RaceItem[]) {
    const leaves: Array<RaceLeaf & { parent?: RaceWeekend }> = [];
    for (const item of items) {
        if (item.type === "race") leaves.push({ ...item });
        if (item.type === "weekend") {
            for (const child of item.children) {
                leaves.push({ ...child, parent: item });
            }
        }
    }
    return leaves;
}

export function getRaceBySlug(items: RaceItem[], slug: string) {
    const leaves = flattenLeafRaces(items);
    return leaves.find((r) => r.slug === slug) ?? null;
}

/**
 * Next race = earliest upcoming leaf race by date.
 * If it belongs to a weekend, we return the leaf plus its parent.
 */
export function getNextRace(items: RaceItem[]) {
    const leaves = flattenLeafRaces(items).filter((r) => r.status === "upcoming");
    if (leaves.length === 0) return null;

    leaves.sort((a, b) => a.date.localeCompare(b.date));
    return leaves[0];
}

export function splitByStatus(items: RaceItem[]) {
    // Keep weekends intact, but only show them inside a section if they have children for that status.
    const upcoming: RaceItem[] = [];
    const completed: RaceItem[] = [];

    for (const item of items) {
        if (item.type === "race") {
            (item.status === "upcoming" ? upcoming : completed).push(item);
            continue;
        }

        // weekend
        const upcomingKids = item.children.filter((c) => c.status === "upcoming");
        const completedKids = item.children.filter((c) => c.status === "completed");

        if (upcomingKids.length) {
            upcoming.push({ ...item, children: upcomingKids });
        }
        if (completedKids.length) {
            completed.push({ ...item, children: completedKids });
        }
    }

    // Optional: sort each section by earliest date inside it
    const sectionSortKey = (it: RaceItem) =>
        it.type === "race" ? it.date : it.children.map((c) => c.date).sort()[0];

    upcoming.sort((a, b) => sectionSortKey(a).localeCompare(sectionSortKey(b)));
    completed.sort((a, b) => sectionSortKey(b).localeCompare(sectionSortKey(a))); // recent first

    return { upcoming, completed };
}
