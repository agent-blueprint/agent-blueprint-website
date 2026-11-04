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

// The only three answers a review gives. Use these words everywhere.
export const verdicts = ["Keep", "Fix", "Stop"] as const;

// Shown on the page and used for the FAQ structured data, so they always match.
export const homeFaqs = [
  {
    q: "Which agents are worth reviewing?",
    a: "One that costs, or is supposed to save, more than about $25,000 a year. Below that, use the free template and do it yourself.",
  },
  {
    q: "What if the AI cost is bundled into a license or a pool of credits?",
    a: "We split it by use. Platforms record usage for each agent, so an agent's cost is its share of the pool. In the sample, the agent uses 20,000 of 120,000 monthly credits, so it carries a sixth of a $144,000-a-year add-on: $2,000 a month. That's the number that matters at renewal.",
  },
  {
    q: "What does my finance lead sign off on?",
    a: "That each number on the summary was measured the way we agreed at kickoff, from the sources it names. Not the decision itself: that stays yours.",
  },
  {
    q: "What counts as clearly better?",
    a: "Unless you set a different bar at kickoff: at least a fifth better than the starting number. Short of the target but past that bar is a Fix; below it is a Stop.",
  },
];

