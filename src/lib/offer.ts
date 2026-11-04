// The one paid offer, in one place so every page quotes the same terms.
// DRAFT PRICE: placeholder until Chris and Amy confirm it.
export const offer = {
  name: "One agent, done properly",
  price: "$7,500",
  designPartnerPrice: "$3,750",
  designPartnerSeats: "five",
  callLength: "30-minute",
  teamHours: "About 8 hours",
  firstAnswer: "two weeks",
};

// The renewal review: every live agent on one platform, before the renewal.
// $24,000 confirmed by Chris on 2026-11-03. Design partner and extra-review
// prices below are still drafts.
// Logic: two deep reviews ($7,500 each) plus a lighter pass over the rest,
// priced near one year of a single pool-tier step for a mid-size add-on.
export const renewal = {
  name: "Renewal review",
  price: "$24,000",
  designPartnerPrice: "$12,000",
  agentsCovered: 20,
  deepReviews: "two",
  extraDeepReview: "$5,000",
  weeks: "four weeks",
  teamHours: "About 12 hours",
};

// The only three answers a review gives. Use these words everywhere.
export const verdicts = ["Keep", "Fix", "Stop"] as const;

// Shown on the page and used for the FAQ structured data, so they always match.
export const homeFaqs = [
  {
    q: "Which should we start with?",
    a: "If your AI spend on a platform is about $150,000 a year or more and a renewal is coming, the renewal review. For a new agent or a pilot that costs, or should save, more than about $50,000 a year, one agent. Below that, the free template does the job.",
  },
  {
    q: "What if the AI cost is bundled into a license or a pool of credits?",
    a: "We split the pool by each agent's share of the credits actually used, and say what dropping it would save at your next pricing tier. Where usage isn't logged per agent, we estimate it and mark it lower confidence. The sample shows the math.",
  },
  {
    q: "Who does the work, and how do you stay independent?",
    a: "The founders, through NowGentic, their services company, which you contract with. NowGentic also builds agents, so it never reviews one it built, and it takes no commissions from software vendors.",
  },
  {
    q: "Will you try to sell us the fix?",
    a: "Only if you ask. The decision is signed off by your finance lead before anyone talks about fixing it. NowGentic quotes a fix only when you ask in writing, at a fixed price, and you're free to use anyone. If NowGentic does the fix and the recheck shows the agent still misses its target, NowGentic redoes it for free.",
  },
  {
    q: "What happens to our data?",
    a: "Read-only access, or we send queries and you run them. We sign your NDA, keep only the numbers on the summary, and delete working data 30 days after the decision.",
  },
  {
    q: "What does my finance lead sign off on?",
    a: "That each number was measured the way we agreed at kickoff, from the sources it names. The decision itself stays yours.",
  },
  {
    q: "What counts as clearly better?",
    a: "Unless you set another bar at kickoff: at least a fifth better than the starting number. Past that but short of the target is a Fix; below it is a Stop.",
  },
];
