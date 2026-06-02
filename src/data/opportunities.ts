export type Source = "INTERNSHALA" | "UNSTOP" | "DEVFOLIO";
export type OppType = "internship" | "hackathon";

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  source: Source;
  type: OppType;
  category: string;
  location: string;
  stipend: number; // monthly INR for internships, prize pool for hackathons
  deadlineDays: number; // days until deadline
  postedDays: number;
}

const CATEGORIES = [
  "Software_Eng", "Frontend_Dev", "Backend_Dev", "Data_Science",
  "AI_Research", "Web3", "Cyber_Security", "Mobile", "Design_System", "DevOps",
];
const LOCATIONS = [
  "Remote", "Bangalore_IN", "Delhi_NCR", "Mumbai_IN", "Hyderabad_IN",
  "Pune_IN", "San_Francisco_US", "London_UK", "Berlin_DE", "Global",
];
const COMPANIES = [
  "Zerodha", "Razorpay", "Postman", "CRED", "Swiggy", "Flipkart",
  "Atlassian", "Stripe", "Vercel", "Linear", "Notion", "ETHGlobal",
  "Devfolio", "HackerEarth", "GeeksForGeeks", "Microsoft", "Google",
  "Cloudflare", "Cred Labs", "Polygon",
];
const HACK_NAMES = [
  "ETHGlobal Bangalore", "Hack The North", "Global AI Hackathon",
  "Solana Speedrun", "DevPost Open Source", "Smart India Hackathon",
  "FOSS United Hack", "Polygon BUIDL IT", "HackMIT", "LLM Agent Jam",
  "Web3 Builders Quest", "Rust Bootcamp Hack", "Climate Tech Sprint",
];
const INTERN_TITLES = [
  "Software Engineer Intern", "Frontend Developer Intern",
  "Backend Engineer Intern", "Data Science Intern", "ML Research Intern",
  "Smart Contract Engineer", "Mobile Dev Intern", "DevOps Intern",
  "UI/UX Research Intern", "Security Research Intern",
  "Platform Engineer Intern", "Growth Engineer Intern",
];

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export const OPPORTUNITIES: Opportunity[] = (() => {
  const rng = seeded(42);
  const out: Opportunity[] = [];
  for (let i = 0; i < 220; i++) {
    const isHack = rng() < 0.32;
    const source: Source = isHack
      ? (rng() < 0.5 ? "UNSTOP" : "DEVFOLIO")
      : "INTERNSHALA";
    const cat = pick(rng, CATEGORIES);
    const loc = pick(rng, LOCATIONS);
    const company = pick(rng, COMPANIES);
    const title = isHack ? pick(rng, HACK_NAMES) : pick(rng, INTERN_TITLES);
    const stipend = isHack
      ? Math.floor(rng() * 800000) + 50000
      : Math.floor(rng() * 80000) + 8000;
    out.push({
      id: `${source.slice(0, 2)}-${(1000 + i).toString()}`,
      title,
      company,
      source,
      type: isHack ? "hackathon" : "internship",
      category: cat,
      location: loc,
      stipend,
      deadlineDays: Math.floor(rng() * 45),
      postedDays: Math.floor(rng() * 30),
    });
  }
  return out;
})();