export type Arcana = "Major" | "Minor";
export type Suit = "Cups" | "Wands" | "Swords" | "Pentacles" | null;
export type Element = "Fire" | "Water" | "Air" | "Earth" | "Spirit";

export interface TarotCard {
  id: number;
  name: string;
  arcana: Arcana;
  suit: Suit;
  element: Element;
  uprightMeaning: string;
  reversedMeaning: string;
  symbolism: string;
  imageUrl: string;
  keywords: string[];
}

export interface Spread {
  id: number;
  name: string;
  description: string;
  numberOfCards: number;
  positions: string[];
}

export interface JournalCard {
  id: number;
  tarotCardId: number;
  position: string;
  isReversed: boolean;
  note: string;
}

export interface JournalEntry {
  id: number;
  userId: number;
  spreadId: number;
  title: string;
  question: string;
  interpretation: string;
  cards: JournalCard[];
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteCard {
  id: number;
  userId: number;
  tarotCardId: number;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export const MOCK_CARDS: TarotCard[] = [
  { id: 1, name: "The Fool", arcana: "Major", suit: null, element: "Air", uprightMeaning: "Fresh hope, new beginnings, spontaneity, a leap of faith into the unknown.", reversedMeaning: "Recklessness, risk-taking, hesitation to begin.", symbolism: "A wanderer at the edge of a cliff, carrying only what is essential.", imageUrl: "", keywords: ["beginning", "innocence", "adventure"] },
  { id: 2, name: "The Magician", arcana: "Major", suit: null, element: "Air", uprightMeaning: "Manifestation, resourcefulness, power, inspired action.", reversedMeaning: "Manipulation, poor planning, untapped talents.", symbolism: "One hand to the sky, one to the earth — as above, so below.", imageUrl: "", keywords: ["manifestation", "willpower", "creation"] },
  { id: 3, name: "The High Priestess", arcana: "Major", suit: null, element: "Water", uprightMeaning: "Intuition, sacred knowledge, the divine feminine, the subconscious.", reversedMeaning: "Secrets, disconnected from intuition, withdrawal.", symbolism: "Seated between two pillars, the veil of mystery behind her.", imageUrl: "", keywords: ["intuition", "mystery", "wisdom"] },
  { id: 4, name: "The Empress", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "Femininity, beauty, nature, abundance, nurturing.", reversedMeaning: "Creative block, dependence on others.", symbolism: "Crowned with stars, surrounded by lush growth.", imageUrl: "", keywords: ["abundance", "nurture", "fertility"] },
  { id: 5, name: "The Emperor", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Authority, structure, control, fatherhood.", reversedMeaning: "Domination, rigidity, lack of discipline.", symbolism: "A ruler upon his throne of stone.", imageUrl: "", keywords: ["authority", "structure", "leadership"] },
  { id: 6, name: "The Hierophant", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "Tradition, spiritual wisdom, conformity, morality.", reversedMeaning: "Rebellion, subversiveness, new approaches.", symbolism: "A sacred teacher passing down ancient truths.", imageUrl: "", keywords: ["tradition", "teaching", "belief"] },
  { id: 7, name: "The Lovers", arcana: "Major", suit: null, element: "Air", uprightMeaning: "Love, harmony, relationships, values alignment, choices.", reversedMeaning: "Disharmony, imbalance, misalignment.", symbolism: "Two souls beneath a guardian angel.", imageUrl: "", keywords: ["love", "union", "choice"] },
  { id: 8, name: "The Chariot", arcana: "Major", suit: null, element: "Water", uprightMeaning: "Control, willpower, victory, determination.", reversedMeaning: "Lack of direction, aggression.", symbolism: "A warrior guiding two sphinxes forward.", imageUrl: "", keywords: ["victory", "willpower", "focus"] },
  { id: 9, name: "Strength", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Inner strength, courage, patience, compassion.", reversedMeaning: "Self-doubt, weakness, insecurity.", symbolism: "A gentle woman calming a lion with her touch.", imageUrl: "", keywords: ["courage", "patience", "gentleness"] },
  { id: 10, name: "The Hermit", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "Soul-searching, introspection, inner guidance.", reversedMeaning: "Isolation, loneliness, withdrawal.", symbolism: "An elder holding a lantern on a mountaintop.", imageUrl: "", keywords: ["solitude", "reflection", "guidance"] },
  { id: 11, name: "Wheel of Fortune", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Good luck, karma, life cycles, destiny.", reversedMeaning: "Bad luck, resistance to change.", symbolism: "A great wheel spinning between the elements.", imageUrl: "", keywords: ["fate", "cycles", "turning point"] },
  { id: 12, name: "The Star", arcana: "Major", suit: null, element: "Air", uprightMeaning: "Hope, faith, purpose, renewal, spirituality.", reversedMeaning: "Lack of faith, despair, disconnection.", symbolism: "A maiden pouring water beneath a canopy of stars.", imageUrl: "", keywords: ["hope", "renewal", "serenity"] },
  { id: 13, name: "The Moon", arcana: "Major", suit: null, element: "Water", uprightMeaning: "Illusion, fear, anxiety, subconscious, intuition.", reversedMeaning: "Release of fear, repressed emotion, inner confusion.", symbolism: "A moon reflected in a still pool, a path winding into shadow.", imageUrl: "", keywords: ["intuition", "dreams", "mystery"] },
  { id: 14, name: "The Sun", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Positivity, success, vitality, joy.", reversedMeaning: "Inner child issues, feeling down.", symbolism: "A radiant sun above a garden of sunflowers.", imageUrl: "", keywords: ["joy", "vitality", "success"] },
  { id: 15, name: "Judgement", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Rebirth, inner calling, absolution.", reversedMeaning: "Self-doubt, refusal of self-examination.", symbolism: "Souls rising to a trumpet's call.", imageUrl: "", keywords: ["awakening", "renewal", "calling"] },
  { id: 16, name: "The World", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "Completion, integration, accomplishment, travel.", reversedMeaning: "Seeking closure, short-cuts, delays.", symbolism: "A dancer inside a celestial wreath surrounded by the four elements.", imageUrl: "", keywords: ["completion", "fulfilment", "wholeness"] },
  { id: 17, name: "Ace of Cups", arcana: "Minor", suit: "Cups", element: "Water", uprightMeaning: "New love, compassion, creativity, emotional beginnings.", reversedMeaning: "Blocked emotions, emptiness.", symbolism: "A chalice overflowing with living water.", imageUrl: "", keywords: ["love", "emotion", "beginning"] },
  { id: 18, name: "Two of Cups", arcana: "Minor", suit: "Cups", element: "Water", uprightMeaning: "Partnership, mutual attraction, harmony.", reversedMeaning: "Break-up, imbalance, tension.", symbolism: "Two figures raising cups in a shared vow.", imageUrl: "", keywords: ["partnership", "connection"] },
  { id: 19, name: "Knight of Cups", arcana: "Minor", suit: "Cups", element: "Water", uprightMeaning: "Romantic, charming, imaginative, following the heart.", reversedMeaning: "Moodiness, disappointment.", symbolism: "A knight rides gently, cup outstretched.", imageUrl: "", keywords: ["romance", "vision"] },
  { id: 20, name: "Ace of Wands", arcana: "Minor", suit: "Wands", element: "Fire", uprightMeaning: "Inspiration, new opportunities, creative spark.", reversedMeaning: "Lack of energy, delays.", symbolism: "A hand emerges from a cloud, holding a budding wand.", imageUrl: "", keywords: ["inspiration", "energy"] },
  { id: 21, name: "Four of Wands", arcana: "Minor", suit: "Wands", element: "Fire", uprightMeaning: "Celebration, harmony, homecoming.", reversedMeaning: "Personal celebration, private joy.", symbolism: "Four wands crowned with a garland of flowers.", imageUrl: "", keywords: ["celebration", "harmony"] },
  { id: 22, name: "Three of Swords", arcana: "Minor", suit: "Swords", element: "Air", uprightMeaning: "Heartbreak, sorrow, painful truths.", reversedMeaning: "Recovery, forgiveness, releasing pain.", symbolism: "A heart pierced by three blades in a stormy sky.", imageUrl: "", keywords: ["sorrow", "release"] },
  { id: 23, name: "Queen of Pentacles", arcana: "Minor", suit: "Pentacles", element: "Earth", uprightMeaning: "Practical, nurturing, financial security.", reversedMeaning: "Self-care neglected, imbalance.", symbolism: "A queen enthroned in a lush garden.", imageUrl: "", keywords: ["nurture", "abundance"] },
  { id: 24, name: "Ace of Pentacles", arcana: "Minor", suit: "Pentacles", element: "Earth", uprightMeaning: "New financial opportunity, prosperity, manifestation.", reversedMeaning: "Missed opportunity, scarcity mindset.", symbolism: "A golden coin blooms from an open palm.", imageUrl: "", keywords: ["prosperity", "opportunity"] },
];

export const MOCK_SPREADS: Spread[] = [
  { id: 1, name: "Single Card", description: "A simple daily draw for guidance.", numberOfCards: 1, positions: ["Message"] },
  { id: 2, name: "Past · Present · Future", description: "A three-card reading tracing your timeline.", numberOfCards: 3, positions: ["Past", "Present", "Future"] },
  { id: 3, name: "Mind · Body · Spirit", description: "A holistic look at your current state.", numberOfCards: 3, positions: ["Mind", "Body", "Spirit"] },
  { id: 4, name: "Celtic Cross", description: "A deep ten-card spread for complex questions.", numberOfCards: 10, positions: ["Present", "Challenge", "Past", "Future", "Above", "Below", "Advice", "External", "Hopes", "Outcome"] },
  { id: 5, name: "Relationship Spread", description: "Insight into a bond between two souls.", numberOfCards: 5, positions: ["You", "Them", "Connection", "Challenge", "Potential"] },
];

export const MOCK_USER: User = {
  id: 1,
  name: "Victoria",
  email: "victoria@email.com",
  createdAt: "2026-01-14",
};

export const MOCK_READINGS: JournalEntry[] = [
  {
    id: 25,
    userId: 1,
    spreadId: 2,
    title: "Focus for the month",
    question: "What should I focus on this month?",
    interpretation: "The past leans on old patterns; the present asks for intuition; the future promises renewal if I trust the pull of the moon.",
    cards: [
      { id: 1, tarotCardId: 10, position: "Past", isReversed: false, note: "The hermit's quiet still lingers." },
      { id: 2, tarotCardId: 13, position: "Present", isReversed: false, note: "Trust what the shadows show." },
      { id: 3, tarotCardId: 12, position: "Future", isReversed: false, note: "A star is waiting." },
    ],
    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",
  },
  {
    id: 26,
    userId: 1,
    spreadId: 1,
    title: "Morning card",
    question: "What do I need to know today?",
    interpretation: "The Sun rises within — say yes to joy.",
    cards: [{ id: 4, tarotCardId: 14, position: "Message", isReversed: false, note: "Bright, wide-awake energy." }],
    createdAt: "2026-07-01",
    updatedAt: "2026-07-01",
  },
];

export const MOCK_FAVORITES: FavoriteCard[] = [
  { id: 1, userId: 1, tarotCardId: 13, createdAt: "2026-05-02" },
  { id: 2, userId: 1, tarotCardId: 12, createdAt: "2026-05-14" },
  { id: 3, userId: 1, tarotCardId: 3, createdAt: "2026-06-20" },
];