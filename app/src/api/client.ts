/* API client for the Cheeky backend.
 *
 * Base URL is configurable via VITE_API_BASE (defaults to the production API).
 * Every method tries the real endpoint and transparently falls back to mock
 * data when the endpoint isn't available yet (404 / network / not-configured),
 * so the app is fully clickable for testing now and "just works" once the real
 * endpoints are handed over — no screen changes needed.
 */
import type { Station, Rental, PaymentCard, User } from "./types";
import { mockStations, mockRentals, mockCards, mockUser } from "./mock";

const BASE = import.meta.env.VITE_API_BASE ?? "https://api.cheekycharging.com";
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

async function tryFetch<T>(path: string, fallback: T): Promise<T> {
  if (USE_MOCKS && !import.meta.env.VITE_API_BASE) return fallback;
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export const api = {
  getStations: () => tryFetch<Station[]>("/api/v1/stations", mockStations),
  getRentals: () => tryFetch<Rental[]>("/api/v1/rentals", mockRentals),
  getCards: () => tryFetch<PaymentCard[]>("/api/v1/wallet/cards", mockCards),
  getUser: () => tryFetch<User>("/api/v1/me", mockUser),
};
