import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiLogin, apiRegister } from "./mock-api";
import type { User } from "./mock-data";

interface AuthCtx {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (u: User) => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "arcana.auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setUser(s.user);
        setToken(s.token);
      }
    } catch {}
  }, []);

  const persist = (u: User | null, t: string | null) => {
    setUser(u);
    setToken(t);
    if (u && t) localStorage.setItem(KEY, JSON.stringify({ user: u, token: t }));
    else localStorage.removeItem(KEY);
  };

  const value: AuthCtx = {
    user,
    token,
    login: async (email, password) => {
      const r = await apiLogin({ email, password });
      persist(r.user, r.token);
    },
    register: async (name, email, password) => {
      const r = await apiRegister({ name, email, password });
      persist(r.user, r.token);
    },
    logout: () => persist(null, null),
    updateUser: (u) => persist(u, token),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
