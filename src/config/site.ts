// src/config/site.ts
import { z } from "zod";
import siteJson from "../content/cms/site.json";

const Schema = z.object({
  brandName: z.string(),
  email: z.email(),
  phoneRaw: z.string(),
  whatsappDefaultMsg: z.string().default("Hello Calamon, I'd like to book."),
  booking: z.url(),
  airbnb: z.url(),
  instagram: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
});

const parsed = Schema.parse(siteJson);

const digits = (s: string) => s.replace(/[^\d]/g, "");
const e164Digits = digits(parsed.phoneRaw);  // e.g. "+30 69..." -> "3069XXXXXXXX"
const e164Plus = `+${e164Digits}`;

export const SITE = {
  brand: { name: parsed.brandName },
  contact: {
    email: parsed.email,
    phoneDisplay: parsed.phoneRaw,
    e164Digits,
    e164Plus,
    whatsappDefaultMsg: parsed.whatsappDefaultMsg,
  },
  listings: { booking: parsed.booking, airbnb: parsed.airbnb },
  socials: { instagram: parsed.instagram, facebook: parsed.facebook },
};

export const LOCATION = {
  label: "Calamon Apartments",
  lat: 35.342318,
  lng: 24.330051,
  placeId: "hnhpEdhuMPiCe4xPW",
};

export const LINKS = {
  booking: SITE.listings.booking,
  airbnb: SITE.listings.airbnb,
  tel: () => `tel:${SITE.contact.e164Plus}`,
  mailto: (subject?: string) =>
    `mailto:${SITE.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`,
  whatsapp: (text = SITE.contact.whatsappDefaultMsg) =>
    `https://wa.me/${SITE.contact.e164Digits}?text=${encodeURIComponent(text)}`,
  viber: () => `viber://chat?number=%2B${SITE.contact.e164Digits}`,
};

export const MAPS = {
  view: () =>
    LOCATION.placeId
      ? `https://www.google.com/maps/search/?api=1&query=${LOCATION.lat},${LOCATION.lng}&query_place_id=${LOCATION.placeId}`
      : `https://www.google.com/maps/search/?api=1&query=${LOCATION.lat},${LOCATION.lng}`,
  directions: (mode: "driving" | "walking" | "bicycling" | "transit" = "driving") =>
    LOCATION.placeId
      ? `https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}&destination_place_id=${LOCATION.placeId}&travelmode=${mode}`
      : `https://www.google.com/maps/dir/?api=1&destination=${LOCATION.lat},${LOCATION.lng}&travelmode=${mode}`,
  // Optional Apple Maps fallback:
  apple: () => `https://maps.apple.com/?ll=${LOCATION.lat},${LOCATION.lng}&q=${encodeURIComponent(LOCATION.label)}`,
};
