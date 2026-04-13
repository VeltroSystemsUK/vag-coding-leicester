import { VAG_PORTFOLIO } from "../data/vagPortfolio";
import { PRODUCTS } from "../data/products";

const CONTACT = {
  phone: "07943 341362",
  email: "info@vagleicester.co.uk",
};

type Rule = { keywords: RegExp; reply: string };

const rules: Rule[] = [
  {
    keywords: /\b(book|appointment|schedule|when|available|availability)\b/i,
    reply: `To book a session, just use our **Contact page** or call/WhatsApp us on **${CONTACT.phone}**. We're a mobile service so we come to you anywhere in Leicester and the surrounding area!`,
  },
  {
    keywords: /\b(price|cost|how much|charge|fee|quote)\b/i,
    reply: `Pricing varies by service and vehicle. For an accurate quote please call/WhatsApp **${CONTACT.phone}** or drop us a message via the **Contact page**. We're happy to give a free no-obligation estimate.`,
  },
  {
    keywords: /\b(service|offer|do you|what can|capable|speciali[sz]e)\b/i,
    reply: `We specialise in:\n\n**• ECU Coding & Programming** – enabling hidden features, retrofits, adaptations\n**• Diagnostics** – fault finding & VCDS/OBD scanning\n**• Retrofits** – OEM features added to your car\n**• Software Updates** – latest factory firmware\n\nWe cover all VAG group vehicles: Audi, VW, SEAT, Škoda, Porsche & Bentley. See our **Services** page for the full list!`,
  },
  {
    keywords: /\b(compatible|compatibility|my car|work on|support|year|model|mk|mk[0-9])\b/i,
    reply: `Great question! Compatibility depends on your specific model, year and existing hardware. We cover the full VAG group — Audi, VW, SEAT, Škoda, Porsche and Bentley.\n\nFor a definitive answer, please give us your **reg or VIN** and call/WhatsApp **${CONTACT.phone}** and we'll check straight away.`,
  },
  {
    keywords: /\b(mobile|come to me|travel|location|where|based|leicester)\b/i,
    reply: `Yes — we're fully **mobile**! We're based in Leicester and travel to your home, workplace, or anywhere that suits you. No need to drop your car off anywhere.`,
  },
  {
    keywords: /\b(contact|phone|number|email|reach|get in touch|call|whatsapp|message)\b/i,
    reply: `You can reach us anytime:\n\n📞 **${CONTACT.phone}** (call or WhatsApp)\n✉️ **${CONTACT.email}**\n\nOr use the **Contact page** on this site to send us a message.`,
  },
  {
    keywords: /\b(coding|vcds|obdeleven|hidden feature|unlock|enable|disable|adapt)\b/i,
    reply: `Coding is our core service! Using VCDS and OBD Eleven we can:\n\n• Enable hidden factory features\n• Perform retrofits and adaptations\n• Code new modules after installation\n• Disable unwanted features\n\nEvery VAG car is different — call/WhatsApp **${CONTACT.phone}** with your model and we'll tell you exactly what's possible.`,
  },
  {
    keywords: /\b(diagnostic|fault|error|warning light|dtc|scan|check engine|p-code)\b/i,
    reply: `We offer full **diagnostic scanning** across all VAG group vehicles. We can read & clear fault codes, identify root causes and advise on the best fix.\n\nCall/WhatsApp **${CONTACT.phone}** to book a diagnostic visit.`,
  },
  {
    keywords: /\b(product|shop|buy|part|item|accessories)\b/i,
    reply: (() => {
      const sample = PRODUCTS.slice(0, 3).map(p => `• ${p.name} — £${p.price}`).join('\n');
      return `Check out our **Shop** page for parts and accessories. Popular items include:\n\n${sample}\n\nFor custom orders or bulk pricing, contact us on **${CONTACT.phone}**.`;
    })(),
  },
  {
    keywords: /\b(audi|vw|volkswagen|seat|skoda|porsche|bentley)\b/i,
    reply: (() => {
      const brands = [...new Set(VAG_PORTFOLIO.map(v => v.brand))].join(', ');
      return `We work across the entire VAG group: **${brands}**.\n\nEach brand shares the same underlying architecture, so we can code and retrofit across the full range. Tell us your model and we'll confirm what's possible — call/WhatsApp **${CONTACT.phone}**.`;
    })(),
  },
];

const fallback = `Thanks for your message! For the most accurate answer, please:\n\n📞 Call or WhatsApp us on **${CONTACT.phone}**\n✉️ Email **${CONTACT.email}**\n📝 Or use the **Contact page**\n\nWe typically respond within a few hours during business hours.`;

export async function getChatResponse(message: string, _history: { role: "user" | "model"; parts: string }[]): Promise<string> {
  const matched = rules.find(r => r.keywords.test(message));
  return Promise.resolve(matched ? matched.reply : fallback);
}
