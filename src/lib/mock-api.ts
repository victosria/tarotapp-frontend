import {
  MOCK_CARDS,
  MOCK_SPREADS,
  MOCK_READINGS,
  MOCK_FAVORITES,
  MOCK_USER,
  type JournalEntry,
  type FavoriteCard,
  type User,
} from "./mock-data";

let readings: JournalEntry[] = [...MOCK_READINGS];
let favorites: FavoriteCard[] = [...MOCK_FAVORITES];
let user: User = { ...MOCK_USER };
let nextReadingId = 100;
let nextFavId = 100;

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export async function apiRegister(input: { name: string; email: string; password: string }) {
  await delay();
  user = { id: 1, name: input.name, email: input.email, createdAt: new Date().toISOString() };
  const token = `mock.jwt.${btoa(input.email)}`;
  return { message: "User created successfully", userId: user.id, token, user };
}
export async function apiLogin(input: { email: string; password: string }) {
  await delay();
  if (!input.email || !input.password) throw new Error("Invalid credentials");
  const token = `mock.jwt.${btoa(input.email)}`;
  user = { ...MOCK_USER, email: input.email };
  return { token, user };
}
export async function apiUpdateUser(patch: Partial<Pick<User, "name" | "email">>) {
  await delay();
  user = { ...user, ...patch };
  return user;
}
export async function apiGetCards() { await delay(); return MOCK_CARDS; }
export async function apiGetCard(id: number) {
  await delay(150);
  const card = MOCK_CARDS.find((c) => c.id === id);
  if (!card) throw new Error("Card not found");
  return card;
}
export async function apiGetSpreads() { await delay(); return MOCK_SPREADS; }
export async function apiGetReadings() {
  await delay();
  return [...readings].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function apiGetReading(id: number) {
  await delay();
  const r = readings.find((x) => x.id === id);
  if (!r) throw new Error("Reading not found");
  return r;
}
export async function apiCreateReading(input: {
  spreadId: number; title: string; question: string; interpretation: string;
  cards: { tarotCardId: number; position: string; isReversed: boolean; note: string }[];
}) {
  await delay();
  const id = nextReadingId++;
  const now = new Date().toISOString();
  const entry: JournalEntry = {
    id, userId: user.id, spreadId: input.spreadId, title: input.title,
    question: input.question, interpretation: input.interpretation,
    cards: input.cards.map((c, i) => ({ id: i + 1, ...c })),
    createdAt: now, updatedAt: now,
  };
  readings = [entry, ...readings];
  return { id, message: "Reading saved successfully" };
}
export async function apiDeleteReading(id: number) {
  await delay();
  readings = readings.filter((r) => r.id !== id);
  return { message: "Reading deleted successfully" };
}
export async function apiGetFavorites() {
  await delay();
  return favorites.map((f) => ({ ...f, card: MOCK_CARDS.find((c) => c.id === f.tarotCardId)! }));
}
export async function apiAddFavorite(cardId: number) {
  await delay();
  if (!favorites.find((f) => f.tarotCardId === cardId)) {
    favorites = [...favorites, { id: nextFavId++, userId: user.id, tarotCardId: cardId, createdAt: new Date().toISOString() }];
  }
  return { message: "Card added to favorites" };
}
export async function apiRemoveFavorite(cardId: number) {
  await delay();
  favorites = favorites.filter((f) => f.tarotCardId !== cardId);
  return { message: "Card removed from favorites" };
}