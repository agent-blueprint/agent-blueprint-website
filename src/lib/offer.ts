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
    a: "One that costs, or is supposed to save, more than about $50,000 a year. Below that, the free template does the job.",
  },
  {
    q: "What if the AI cost is bundled into a license or a pool of credits?",
    a: "We split the pool by each agent's share of the credits actually used, and say what dropping it would save at your next pricing tier. Where usage isn't logged per agent, we estimate it and mark it lower confidence. The sample shows the math.",
  },
  {
    q: "Who does the work, and how do you stay independent?",
    a: "The founders, through NowGentic, their services company, which you contract with. NowGentic also builds agents, so it never reviews one it built, and the decision is signed off before any fix is discussed. You're free to use anyone for the fix.",
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
