/* Mock data derived from the current app's screenshots. Used until the real
 * api.cheekycharging.com endpoints are wired in. Coordinates are real London
 * locations so the map looks right during testing. */
import type { Station, Rental, PaymentCard, User, ChatMessage } from "./types";

export const mockUser: User = {
  name: "Cameron Young",
  phone: "7568497136",
  email: "cammyoung@live.co.uk",
  balance: 222,
};

export const mockCards: PaymentCard[] = [
  { id: "c1", brand: "mastercard&apple_pay", last4: "5629", expiry: "3/2028" },
];

export const mockStations: Station[] = [
  { id: "s1", name: "Mercato Metropolitano", shortName: "mercato", hours: "12:00~00:00", available: 26, empty: 10, lat: 51.4954, lng: -0.0959 },
  { id: "s2", name: "Peckham Arches", shortName: "peckham ar", hours: "16:00~23:00", available: 9, empty: 3, lat: 51.4735, lng: -0.0656 },
  { id: "s3", name: "Islington Central", shortName: "islington", hours: "09:00~23:00", available: 14, empty: 6, lat: 51.5362, lng: -0.1033 },
  { id: "s4", name: "Shoreditch Yard", shortName: "shoreditch", hours: "10:00~01:00", available: 4, empty: 12, lat: 51.5265, lng: -0.0784 },
  { id: "s5", name: "Bethnal Green Tap", shortName: "bethnal", hours: "12:00~00:00", available: 18, empty: 2, lat: 51.5270, lng: -0.0550 },
  { id: "s6", name: "Clapham Common Bar", shortName: "clapham", hours: "11:00~23:30", available: 0, empty: 20, lat: 51.4610, lng: -0.1380 },
  { id: "s7", name: "Soho Corner", shortName: "soho", hours: "10:00~02:00", available: 11, empty: 5, lat: 51.5138, lng: -0.1340 },
  { id: "s8", name: "Camden Lock", shortName: "camden", hours: "10:00~00:00", available: 7, empty: 9, lat: 51.5416, lng: -0.1466 },
];

export const mockRentals: Rental[] = [
  { id: "r1", orderNo: "HDE202604021931471005780 8", amount: 0, branch: "TESTING123", rentTime: "2026-04-02 19:31:53", returnedTime: "2026-04-02 19:32:03", lengthOfUse: "1 Min", status: "returned" },
  { id: "r2", orderNo: "HDE20251015185529100377 80", amount: 28, branch: "STWTEST", rentTime: "2025-10-15 18:55:33", returnedTime: "2025-10-16 19:00:00", lengthOfUse: "1D 5 Min", status: "reported_lost" },
  { id: "r3", orderNo: "HDE202505231616041001522 4", amount: 0, branch: "TESTING123", rentTime: "2025-05-23 16:16:07", returnedTime: "2025-05-23 16:20:00", lengthOfUse: "4 Min", status: "returned" },
];

export const mockChat: ChatMessage[] = [
  { id: "m1", from: "agent", text: "Hi 👋 Welcome to Cheeky Charging support. How can we help today?", time: "13:10" },
];
