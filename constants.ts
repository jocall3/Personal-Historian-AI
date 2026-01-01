
import { Memory, UserProfile, Tag, Location, Person, Agent, TokenAccount } from "./types";

export const INITIAL_MEMORIES: Memory[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `mem-${i}`,
  title: `Summer Trip to ${i % 2 === 0 ? "Kyoto" : "Tuscany"} ${2018 + (i % 5)}`,
  summary: `An amazing journey exploring the local culture and architecture.`,
  description: `We spent two weeks traveling across the region. The highlights included the local festivals and the incredible food. It felt like a transformative experience that I'll cherish forever.`,
  timestamp: new Date(Date.now() - i * 86400000 * 30).toISOString(),
  assets: [
    {
      id: `asset-${i}-1`,
      type: "PHOTO",
      url: `https://picsum.photos/seed/${i}/800/600`,
      thumbnailUrl: `https://picsum.photos/seed/${i}/200/200`,
      caption: "A beautiful view of the sunset.",
      timestamp: new Date().toISOString(),
      aiAnalyzed: true
    }
  ],
  sentiment: (["positive", "neutral", "mixed"] as const)[i % 3],
  tagIds: [`tag-${i % 5}`],
  locationId: `loc-${i % 5}`,
  peopleIds: [`person-${i % 3}`],
  status: "published",
  visibility: "private"
}));

export const INITIAL_USER: UserProfile = {
  id: "user-alpha",
  name: "Alex Historian",
  email: "alex@example.ai",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  bio: "Preserving the past, understanding the present, shaping the future.",
  digitalIdentityId: "did-user-alpha",
  tokenAccountId: "acc-user-alpha",
  preferences: {
    theme: "dark",
    defaultView: "dashboard",
    notificationSettings: {
      memoryAnniversaries: true,
      newInsights: true,
      agentActivityAlerts: true,
      transactionNotifications: true
    }
  }
};

export const INITIAL_TAGS: Tag[] = [
  { id: "tag-0", name: "Travel", category: "Topic", color: "#3b82f6" },
  { id: "tag-1", name: "Family", category: "People", color: "#ef4444" },
  { id: "tag-2", name: "Career", category: "Work", color: "#10b981" },
  { id: "tag-3", name: "Art", category: "Interest", color: "#f59e0b" },
  { id: "tag-4", name: "Health", category: "Personal", color: "#8b5cf6" }
];

export const INITIAL_LOCATIONS: Location[] = [
  { id: "loc-0", name: "Home", type: "home", description: "The center of my world." },
  { id: "loc-1", name: "Office", type: "work", description: "Where the magic (and hard work) happens." },
  { id: "loc-2", name: "Tokyo", type: "city", description: "A city that never sleeps." },
  { id: "loc-3", name: "Paris", type: "city", description: "City of lights and love." },
  { id: "loc-4", name: "Grand Canyon", type: "landmark", description: "Majestic natural wonder." }
];

export const INITIAL_PEOPLE: Person[] = [
  { id: "person-0", name: "Sarah Smith", relationship: "Friend", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: "person-1", name: "John Doe", relationship: "Colleague", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { id: "person-2", name: "Emily Green", relationship: "Family", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" }
];

export const INITIAL_AGENTS: Agent[] = [
  {
    id: "agent-analyzer-01",
    name: "Aletheia",
    type: "analyzer",
    description: "Semantic analysis and insight extraction agent.",
    status: "active",
    skillIds: ["skill-sentiment", "skill-tagging"],
    digitalIdentityId: "did-agent-aletheia",
    tokenBalance: 5000
  },
  {
    id: "agent-curator-01",
    name: "Mnemosyne",
    type: "curator",
    description: "Memory organization and timeline narrative builder.",
    status: "active",
    skillIds: ["skill-linking"],
    digitalIdentityId: "did-agent-mnemosyne",
    tokenBalance: 4200
  }
];

export const TOKEN_ACCOUNT: TokenAccount = {
  id: "acc-user-alpha",
  ownerId: "user-alpha",
  ownerType: "user",
  balance: 1500,
  currency: "HST"
};
