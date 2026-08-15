import type { FavoriteCard, JournalEntry, Spread, TarotCard, User } from "./mock-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const AUTH_KEY = "arcana.auth";

type AuthResponse = { token: string; user: User };
type FavoriteWithCard = FavoriteCard & { card: TarotCard };

function getToken() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored).token as string | null : null;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestInit = {}, authenticated = false): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set("Content-Type", "application/json");

  if (authenticated) {
    const token = getToken();
    if (!token) throw new Error("Please sign in to continue");
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error("Could not connect to the Arcana Journey API. Make sure the backend is running.");
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.message ?? "Something went wrong");
  return body as T;
}

export function apiRegister(input: { name: string; email: string; password: string }) {
  return request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(input) });
}

export function apiLogin(input: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(input) });
}

export function apiGetCurrentUser() {
  return request<User>("/auth/me", {}, true);
}

export function apiUpdateUser(patch: Partial<Pick<User, "name" | "email">>) {
  return request<User>("/auth/me", { method: "PATCH", body: JSON.stringify(patch) }, true);
}

export function apiGetCards() {
  return request<TarotCard[]>("/cards");
}

export function apiGetCard(id: number) {
  return request<TarotCard>(`/cards/${id}`);
}

export function apiGetSpreads() {
  return request<Spread[]>("/spreads");
}

export function apiGetReadings() {
  return request<JournalEntry[]>("/readings", {}, true);
}

export function apiGetReading(id: number) {
  return request<JournalEntry>(`/readings/${id}`, {}, true);
}

export function apiCreateReading(input: {
  spreadId: number;
  title: string;
  question: string;
  interpretation: string;
  cards: { tarotCardId: number; position: string; isReversed: boolean; note: string }[];
}) {
  return request<JournalEntry>("/readings", { method: "POST", body: JSON.stringify(input) }, true);
}

export function apiDeleteReading(id: number) {
  return request<{ message: string }>(`/readings/${id}`, { method: "DELETE" }, true);
}

export function apiGetFavorites() {
  return request<FavoriteWithCard[]>("/favorites", {}, true);
}

export function apiAddFavorite(cardId: number) {
  return request<{ message: string }>(`/favorites/${cardId}`, { method: "POST" }, true);
}

export function apiRemoveFavorite(cardId: number) {
  return request<{ message: string }>(`/favorites/${cardId}`, { method: "DELETE" }, true);
}
