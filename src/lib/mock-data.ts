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
  { id: 1, name: "The Fool", arcana: "Major", suit: null, element: "Air", uprightMeaning: "A new beginning invites you to move forward with curiosity, trust, and an open heart. The Fool encourages a leap of faith even when the entire path is not yet visible.", reversedMeaning: "Impulsiveness, poor judgment, or fear of taking the first step may be blocking progress. Consider the risks without allowing caution to become paralysis.", symbolism: "The cliff represents the unknown, the white rose symbolizes innocence, and the small bag carries lessons from the past without unnecessary weight.", imageUrl: "", keywords: ["beginnings", "freedom", "spontaneity", "faith"] },
  { id: 2, name: "The Magician", arcana: "Major", suit: null, element: "Air", uprightMeaning: "You have the skills, resources, and focus needed to turn an intention into reality. Direct your energy with clarity and take purposeful action.", reversedMeaning: "Your abilities may be unfocused, underused, or directed toward manipulation. Reconnect with your true intention before trying to influence the outcome.", symbolism: "The four suit tools represent complete resources, while one hand points above and the other below to unite idea and action.", imageUrl: "", keywords: ["manifestation", "willpower", "skill", "action"] },
  { id: 3, name: "The High Priestess", arcana: "Major", suit: null, element: "Water", uprightMeaning: "Quiet observation and intuition reveal more than immediate action. Trust the knowledge beneath the surface and allow mystery to unfold in its own time.", reversedMeaning: "You may be ignoring your intuition, withholding important truth, or becoming overwhelmed by hidden emotions. Create enough silence to hear your inner voice again.", symbolism: "The black and white pillars represent duality, the veil guards hidden knowledge, and the moon reflects the cycles of intuition.", imageUrl: "", keywords: ["intuition", "mystery", "stillness", "inner knowledge"] },
  { id: 4, name: "The Empress", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "Creativity, pleasure, and abundance grow when they are given patient care. Nurture your body, your relationships, and the ideas you want to bring into the world.", reversedMeaning: "Creative blocks, overgiving, or dependence on external validation may be draining you. Restore your own needs before continuing to nurture others.", symbolism: "The wheat and lush landscape express fertility, while the starry crown connects earthly creation with a larger natural rhythm.", imageUrl: "", keywords: ["abundance", "creativity", "nurturing", "sensuality"] },
  { id: 5, name: "The Emperor", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Structure, responsibility, and clear boundaries create stability. Lead with discipline and use authority to protect what you are building.", reversedMeaning: "Control may have become rigidity, domination, or resistance to vulnerability. Reconsider whether your rules support the situation or merely restrict it.", symbolism: "The stone throne represents lasting authority, the mountains show endurance, and the armor suggests readiness to protect and command.", imageUrl: "", keywords: ["authority", "structure", "leadership", "stability"] },
  { id: 6, name: "The Hierophant", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "Tradition, shared values, or an experienced teacher can offer useful guidance. This card favors learning within an established system or community.", reversedMeaning: "Inherited rules may no longer reflect your truth. Question convention thoughtfully and decide which teachings deserve to remain part of your path.", symbolism: "The crossed keys represent access to sacred knowledge, while the two students show wisdom being preserved and passed forward.", imageUrl: "", keywords: ["tradition", "teaching", "belief", "community"] },
  { id: 7, name: "The Lovers", arcana: "Major", suit: null, element: "Air", uprightMeaning: "Connection becomes meaningful through honesty, shared values, and conscious choice. This card may describe love, but it also asks you to choose in alignment with who you truly are.", reversedMeaning: "Disharmony, conflicting values, or avoidance of a necessary choice may be weakening a bond. Restore honesty within yourself before seeking agreement with another person.", symbolism: "The two figures represent vulnerable union, while the angel above them suggests a relationship guided by truth and higher values.", imageUrl: "", keywords: ["love", "alignment", "choice", "union"] },
  { id: 8, name: "The Chariot", arcana: "Major", suit: null, element: "Water", uprightMeaning: "Determination and emotional control can carry you through competing pressures. Choose a direction, hold the reins firmly, and move with confidence.", reversedMeaning: "Scattered motivation, aggression, or a lack of direction may be pulling you off course. Regain control by deciding what deserves your energy.", symbolism: "The opposing sphinxes represent conflicting forces, while the armored charioteer shows the focus required to guide them together.", imageUrl: "", keywords: ["determination", "victory", "direction", "self-control"] },
  { id: 9, name: "Strength", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "True strength appears through patience, compassion, and steady self-command. Meet intensity without suppressing it and guide it with courage.", reversedMeaning: "Self-doubt, insecurity, or poorly managed emotion may be weakening your confidence. Gentleness toward yourself is the beginning of restored power.", symbolism: "The woman calming the lion represents conscious compassion guiding instinct, and the infinity symbol suggests enduring inner power.", imageUrl: "", keywords: ["courage", "compassion", "patience", "inner power"] },
  { id: 10, name: "The Hermit", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "Solitude offers the clarity that noise cannot provide. Step back, reflect carefully, and follow the wisdom discovered through direct experience.", reversedMeaning: "Healthy reflection may have turned into isolation, avoidance, or disconnection. Consider whether you need more time alone or a safe way back toward others.", symbolism: "The lantern illuminates only the next steps, while the mountaintop represents wisdom gained through a demanding personal journey.", imageUrl: "", keywords: ["introspection", "solitude", "wisdom", "guidance"] },
  { id: 11, name: "Wheel of Fortune", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Circumstances are shifting, opening a new phase in a larger cycle. Work with the movement of change and recognize the opportunities it brings.", reversedMeaning: "Resistance, delays, or repeated patterns may make events feel beyond your control. Focus on your response and on the lesson the cycle continues to present.", symbolism: "The turning wheel reflects changing fortune, while the surrounding figures represent forces of time, knowledge, and destiny.", imageUrl: "", keywords: ["cycles", "change", "destiny", "turning point"] },
  { id: 12, name: "Justice", arcana: "Major", suit: null, element: "Air", uprightMeaning: "Truth, accountability, and balanced judgment are required. Make decisions based on clear evidence and accept the consequences of previous choices.", reversedMeaning: "Bias, denial, or unwillingness to take responsibility may be distorting the situation. Correct what you can and examine where honesty has been avoided.", symbolism: "The scales weigh every factor, the upright sword represents clear judgment, and the throne reflects impartial authority.", imageUrl: "", keywords: ["truth", "fairness", "accountability", "consequences"] },
  { id: 13, name: "The Hanged Man", arcana: "Major", suit: null, element: "Water", uprightMeaning: "Progress comes through pause, surrender, and a different perspective. Release the need to force an answer and allow the situation to reveal itself differently.", reversedMeaning: "The pause may have become unnecessary delay, avoidance, or sacrifice without purpose. Decide whether you are truly surrendering or simply refusing to move.", symbolism: "The reversed position changes perception, the halo shows insight, and the calm expression suggests willing rather than imposed surrender.", imageUrl: "", keywords: ["surrender", "pause", "perspective", "release"] },
  { id: 14, name: "Death", arcana: "Major", suit: null, element: "Water", uprightMeaning: "A chapter has reached its natural ending so that genuine transformation can begin. Release what has expired instead of carrying it into the next phase.", reversedMeaning: "Fear of loss or attachment to the familiar may be prolonging an ending. Change becomes heavier when you continue negotiating with what is already complete.", symbolism: "The skeletal rider represents unavoidable change, while the rising sun beyond the towers promises renewal after an ending.", imageUrl: "", keywords: ["ending", "transformation", "release", "renewal"] },
  { id: 15, name: "Temperance", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Balance develops through patience, moderation, and thoughtful integration. Combine different needs or influences until they support rather than compete with one another.", reversedMeaning: "Excess, impatience, or conflicting priorities may be creating instability. Slow down and restore proportion before trying to advance.", symbolism: "Water moving between two cups represents careful integration, while one foot on land and one in water unite practical and emotional experience.", imageUrl: "", keywords: ["balance", "moderation", "harmony", "integration"] },
  { id: 16, name: "The Devil", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "Attachment, temptation, or an unhealthy pattern may be limiting your freedom. Recognizing the pattern clearly is the first step toward choosing differently.", reversedMeaning: "Awareness is creating an opportunity to loosen old bonds and reclaim personal power. Release requires responsibility as well as the willingness to change familiar behavior.", symbolism: "The loose chains show that bondage is partly maintained by belief, while the inverted torch points to desire without conscious direction.", imageUrl: "", keywords: ["attachment", "temptation", "shadow", "restriction"] },
  { id: 17, name: "The Tower", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "A sudden truth or disruption breaks apart a structure that could no longer hold. Although unsettling, the collapse creates space for something more honest.", reversedMeaning: "You may be resisting an inevitable change or processing a private upheaval. Avoiding the truth may reduce immediate discomfort while extending the instability.", symbolism: "Lightning represents revelation, the falling crown shows false authority collapsing, and the figures leave a structure built on an unstable foundation.", imageUrl: "", keywords: ["upheaval", "revelation", "collapse", "liberation"] },
  { id: 18, name: "The Star", arcana: "Major", suit: null, element: "Air", uprightMeaning: "Hope returns through healing, openness, and renewed trust in the future. Let yourself be guided by what feels honest, restorative, and quietly meaningful.", reversedMeaning: "Discouragement or disconnection may make possibility difficult to see. Rebuild faith through small acts of care rather than waiting to feel completely certain.", symbolism: "The central star offers guidance, the smaller stars suggest harmony, and the flowing water renews both inner and outer life.", imageUrl: "", keywords: ["hope", "healing", "inspiration", "renewal"] },
  { id: 19, name: "The Moon", arcana: "Major", suit: null, element: "Water", uprightMeaning: "Uncertainty, dreams, and unconscious emotion are shaping perception. Move slowly, listen to intuition, and avoid treating every fear as a fact.", reversedMeaning: "Confusion may be lifting, or hidden anxiety may be becoming impossible to ignore. Name what is real and separate intuition from projection.", symbolism: "The moon illuminates indirectly, the path crosses uncertain terrain, and the dog and wolf represent the tamed and wild sides of instinct.", imageUrl: "", keywords: ["intuition", "illusion", "dreams", "uncertainty"] },
  { id: 20, name: "The Sun", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "Clarity, vitality, and genuine joy are available. Allow yourself to be visible, celebrate progress, and approach life with renewed confidence.", reversedMeaning: "Happiness may feel delayed, diminished, or blocked by unrealistic expectations. The light is still present, but you may need to recognize it in a simpler form.", symbolism: "The radiant sun represents truth and life, the child expresses openness, and the sunflowers turn naturally toward growth.", imageUrl: "", keywords: ["joy", "clarity", "success", "vitality"] },
  { id: 21, name: "Judgement", arcana: "Major", suit: null, element: "Fire", uprightMeaning: "An honest review of the past creates awakening and a chance to respond differently. Answer the call to become more aligned with what you now understand.", reversedMeaning: "Self-doubt, harsh judgment, or refusal to learn from the past may be delaying renewal. Forgiveness does not erase responsibility; it allows movement beyond it.", symbolism: "The trumpet announces awakening, while the rising figures represent consciousness responding to a higher and unavoidable call.", imageUrl: "", keywords: ["awakening", "reflection", "calling", "rebirth"] },
  { id: 22, name: "The World", arcana: "Major", suit: null, element: "Earth", uprightMeaning: "A cycle reaches completion through integration, achievement, and a sense of wholeness. Recognize what you have learned before stepping into the next journey.", reversedMeaning: "Closure may be delayed by unfinished work, shortcuts, or difficulty acknowledging an ending. Identify the final action needed to complete the cycle.", symbolism: "The wreath forms a complete circle, the dancer unites movement and balance, and the four figures represent the elements in harmony.", imageUrl: "", keywords: ["completion", "integration", "achievement", "wholeness"] },
  { id: 23, name: "Ace of Cups", arcana: "Minor", suit: "Cups", element: "Water", uprightMeaning: "New love, compassion, creativity, emotional beginnings.", reversedMeaning: "Blocked emotions, emptiness.", symbolism: "A chalice overflowing with living water.", imageUrl: "", keywords: ["love", "emotion", "beginning"] },
  { id: 24, name: "Two of Cups", arcana: "Minor", suit: "Cups", element: "Water", uprightMeaning: "Partnership, mutual attraction, harmony.", reversedMeaning: "Break-up, imbalance, tension.", symbolism: "Two figures raising cups in a shared vow.", imageUrl: "", keywords: ["partnership", "connection"] },
  { id: 25, name: "Knight of Cups", arcana: "Minor", suit: "Cups", element: "Water", uprightMeaning: "Romantic, charming, imaginative, following the heart.", reversedMeaning: "Moodiness, disappointment.", symbolism: "A knight rides gently, cup outstretched.", imageUrl: "", keywords: ["romance", "vision"] },
  { id: 26, name: "Ace of Wands", arcana: "Minor", suit: "Wands", element: "Fire", uprightMeaning: "Inspiration, new opportunities, creative spark.", reversedMeaning: "Lack of energy, delays.", symbolism: "A hand emerges from a cloud, holding a budding wand.", imageUrl: "", keywords: ["inspiration", "energy"] },
  { id: 27, name: "Four of Wands", arcana: "Minor", suit: "Wands", element: "Fire", uprightMeaning: "Celebration, harmony, homecoming.", reversedMeaning: "Personal celebration, private joy.", symbolism: "Four wands crowned with a garland of flowers.", imageUrl: "", keywords: ["celebration", "harmony"] },
  { id: 28, name: "Three of Swords", arcana: "Minor", suit: "Swords", element: "Air", uprightMeaning: "Heartbreak, sorrow, painful truths.", reversedMeaning: "Recovery, forgiveness, releasing pain.", symbolism: "A heart pierced by three blades in a stormy sky.", imageUrl: "", keywords: ["sorrow", "release"] },
  { id: 29, name: "Queen of Pentacles", arcana: "Minor", suit: "Pentacles", element: "Earth", uprightMeaning: "Practical, nurturing, financial security.", reversedMeaning: "Self-care neglected, imbalance.", symbolism: "A queen enthroned in a lush garden.", imageUrl: "", keywords: ["nurture", "abundance"] },
  { id: 30, name: "Ace of Pentacles", arcana: "Minor", suit: "Pentacles", element: "Earth", uprightMeaning: "New financial opportunity, prosperity, manifestation.", reversedMeaning: "Missed opportunity, scarcity mindset.", symbolism: "A golden coin blooms from an open palm.", imageUrl: "", keywords: ["prosperity", "opportunity"] },
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
      { id: 2, tarotCardId: 19, position: "Present", isReversed: false, note: "Trust what the shadows show." },
      { id: 3, tarotCardId: 18, position: "Future", isReversed: false, note: "A star is waiting." },
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
    cards: [{ id: 4, tarotCardId: 20, position: "Message", isReversed: false, note: "Bright, wide-awake energy." }],
    createdAt: "2026-07-01",
    updatedAt: "2026-07-01",
  },
];

export const MOCK_FAVORITES: FavoriteCard[] = [
  { id: 1, userId: 1, tarotCardId: 19, createdAt: "2026-05-02" },
  { id: 2, userId: 1, tarotCardId: 18, createdAt: "2026-05-14" },
  { id: 3, userId: 1, tarotCardId: 3, createdAt: "2026-06-20" },
];
