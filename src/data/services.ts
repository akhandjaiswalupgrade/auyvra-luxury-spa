export type ServiceCategory = "All" | "60 Min" | "90 Min" | "VIP" | "Body Therapies";

export interface Service {
  id: string;
  name: string;
  duration?: string;
  category: ServiceCategory[];
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    id: "thai-massage-dry",
    name: "Thai Massage — Dry",
    duration: "60 / 90 Minutes",
    category: ["All", "60 Min", "90 Min"],
    description: "Traditional dry massage using pressure points and stretching to relieve tension and improve energy flow.",
    image: "/images/generated/thai_dry_massage.webp",
  },
  {
    id: "aroma-massage",
    name: "Aroma Massage",
    duration: "60 / 90 Minutes",
    category: ["All", "60 Min", "90 Min"],
    description: "Gentle massage utilizing warm, premium essential oils to calm your nervous system and soothe senses.",
    image: "/images/generated/aroma_candle_therapy.webp",
  },
  {
    id: "swedish-massage",
    name: "Swedish Massage",
    duration: "60 / 90 Minutes",
    category: ["All", "60 Min", "90 Min"],
    description: "Classic relaxation massage using long, flowing strokes to reduce stress, muscle tension, and improve blood flow.",
    image: "/images/generated/swedish_massage.webp",
  },
  {
    id: "deep-tissue",
    name: "Deep Tissue Massage",
    duration: "60 / 90 Minutes",
    category: ["All", "60 Min", "90 Min"],
    description: "Intense pressure therapy targeting deep muscle groups to relieve chronic tension, knots, and tightness.",
    image: "/images/generated/deep_tissue_massage.webp",
  },
  {
    id: "hot-oil",
    name: "Hot Oil Massage",
    duration: "60 / 90 Minutes",
    category: ["All", "60 Min", "90 Min"],
    description: "Soothing massage using heated therapeutic oils to deeply hydrate the skin and ease joint stiffness.",
    image: "/images/generated/hot_oil_massage.webp",
  },
  {
    id: "foot-reflexology",
    name: "Foot Reflexology",
    duration: "60 Minutes",
    category: ["All", "60 Min"],
    description: "Targeted massage on reflex zones of the feet to restore balance and stimulate holistic wellness.",
    image: "/images/generated/foot_reflexology.webp",
  },
  {
    id: "vip-signature-room",
    name: "VIP Signature Room",
    duration: "60 Minutes",
    category: ["All", "VIP"],
    description: "Experience premium therapeutic body massage inside our exclusive, luxury VVIP signature room.",
    image: "/images/generated/vip_signature_room.webp",
  },
  {
    id: "vip-signature-steam",
    name: "VIP Signature Room with Steam",
    duration: "90 Minutes",
    category: ["All", "VIP"],
    description: "Indulge in a premium full-body therapy followed by a private, relaxing steam room session.",
    image: "/images/generated/steam_vip_room.webp",
  },
  {
    id: "royal-jacuzzi",
    name: "Royal Jacuzzi Massage",
    duration: "Premium",
    category: ["All", "VIP"],
    description: "Luxurious soak in our ambient private jacuzzi hydrotherapy pool, combined with a soothing body massage.",
    image: "/images/generated/jacuzzi_luxury_experience.webp",
  },
  {
    id: "body-scrub",
    name: "Body Scrub Therapy",
    duration: "Premium",
    category: ["All", "Body Therapies"],
    description: "Natural exfoliating body scrub to buff away dry skin, improve texture, and reveal radiant, healthy skin.",
    image: "/images/generated/body_scrub_therapy.webp",
  },
  {
    id: "candle-therapy",
    name: "Candle Therapy Massage",
    duration: "Premium",
    category: ["All", "Body Therapies"],
    description: "Warm, nourishing melted candle wax massaged smoothly into the skin for deep warmth and moisture.",
    image: "/images/generated/candle_massage.webp",
  },
  {
    id: "thai-yoga",
    name: "Thai Yoga Massage",
    duration: "Premium",
    category: ["All", "Body Therapies"],
    description: "Dynamic active massage incorporating passive yoga stretching to open joints and improve flexibility.",
    image: "/images/generated/thai_yoga_massage.webp",
  },
  {
    id: "balinese-massage-premium",
    name: "Balinese Massage",
    duration: "Premium",
    category: ["All", "Body Therapies"],
    description: "Traditional Indonesian full-body treatment combining gentle stretches, skin rolling, and aromatherapy.",
    image: "/images/generated/balinese_massage.webp",
  }
];
