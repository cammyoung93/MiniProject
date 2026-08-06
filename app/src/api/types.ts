/* Domain types for the Cheeky Charging app. These mirror what the screens
 * need; when the real api.cheekycharging.com contract arrives we adapt the
 * client mappers, not the screens. */

export type Station = {
  id: string;
  name: string;
  shortName: string;
  hours: string;          // e.g. "12:00~00:00"
  available: number;
  empty: number;
  lat: number;
  lng: number;
  logoUrl?: string;
};

export type Rental = {
  id: string;
  orderNo: string;
  amount: number;
  branch: string;
  rentTime: string;
  returnedTime: string | null;
  lengthOfUse: string;
  status: "returned" | "renting" | "reported_lost";
};

export type PaymentCard = {
  id: string;
  brand: string;          // "mastercard&apple_pay"
  last4: string;
  expiry: string;         // "3/2028"
};

export type User = {
  name: string;
  phone: string;
  email: string;
  balance: number;
  avatarUrl?: string;
};

export type ChatMessage = {
  id: string;
  from: "user" | "agent";
  text: string;
  time: string;
};
