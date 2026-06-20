export type ServiceCategory = "All" | "60 Min" | "90 Min" | "VIP" | "Hammam" | "Body Therapies";

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
    id: "thai-massage-60",
    name: "Thai Massage — Dry",
    duration: "60 Minutes",
    category: ["All", "60 Min"],
    description: "Traditional dry massage to relieve tension, improve flexibility, and balance energy.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "aroma-massage-60",
    name: "Aroma Massage",
    duration: "60 Minutes",
    category: ["All", "60 Min"],
    description: "Relaxing massage using premium essential oils to calm the mind and soothe the body.",
    image: "/images/generated/aroma_candle_therapy.png",
  },
  {
    id: "swedish-massage-60",
    name: "Swedish Massage",
    duration: "60 Minutes",
    category: ["All", "60 Min"],
    description: "Gentle, flowing strokes to improve circulation and promote overall relaxation.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "deep-tissue-60",
    name: "Deep Tissue Massage",
    duration: "60 Minutes",
    category: ["All", "60 Min"],
    description: "Intense pressure targeting deeper muscle layers to relieve chronic pain and stiffness.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "hot-oil-60",
    name: "Hot Oil Massage",
    duration: "60 Minutes",
    category: ["All", "60 Min"],
    description: "Warm oil massage designed to deeply nourish the skin and melt away stress.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "foot-reflexology-60",
    name: "Foot Reflexology",
    duration: "60 Minutes",
    category: ["All", "60 Min"],
    description: "Targeted pressure point therapy on the feet to stimulate wellness throughout the body.",
    image: "/images/generated/foot_reflexology.png",
  },
  {
    id: "thai-massage-90",
    name: "Thai Massage — Dry",
    duration: "90 Minutes",
    category: ["All", "90 Min"],
    description: "An extended traditional dry massage for deeper tension relief and flexibility.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "aroma-massage-90",
    name: "Aroma Massage",
    duration: "90 Minutes",
    category: ["All", "90 Min"],
    description: "A longer immersive session using essential oils for profound mental and physical calm.",
    image: "/images/generated/aroma_candle_therapy.png",
  },
  {
    id: "swedish-massage-90",
    name: "Swedish Massage",
    duration: "90 Minutes",
    category: ["All", "90 Min"],
    description: "90 minutes of gentle, flowing strokes for maximum circulation and stress relief.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "deep-tissue-90",
    name: "Deep Tissue Massage",
    duration: "90 Minutes",
    category: ["All", "90 Min"],
    description: "Extended intensive therapy for chronic muscle tension and deep relaxation.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "hot-oil-90",
    name: "Hot Oil Massage",
    duration: "90 Minutes",
    category: ["All", "90 Min"],
    description: "A comprehensive warm oil experience leaving your body restored and skin hydrated.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "vip-signature-60",
    name: "VIP Signature Room",
    duration: "60 Minutes",
    category: ["All", "VIP"],
    description: "Enjoy our premium therapies in an exclusive, luxurious VIP setting.",
    image: "/images/generated/vip_signature_room.png",
  },
  {
    id: "vip-signature-steam-90",
    name: "VIP Signature Room with Steam",
    duration: "90 Minutes",
    category: ["All", "VIP"],
    description: "The ultimate privacy and relaxation, combining premium massage with a private steam session.",
    image: "/images/generated/steam_vip_room.png",
  },
  {
    id: "vvip-royal-hammam",
    name: "VVIP Royal Hammam",
    duration: "Premium",
    category: ["All", "VIP", "Hammam"],
    description: "An opulent cleansing and relaxation ritual in our luxury hammam suite.",
    image: "/images/generated/hammam_ritual.png",
  },
  {
    id: "royal-jacuzzi",
    name: "Royal Jacuzzi Massage",
    duration: "Premium",
    category: ["All", "VIP"],
    description: "Unwind in our warm, elegantly lit jacuzzi combined with soothing massage therapy.",
    image: "/images/generated/jacuzzi_luxury_experience.png",
  },
  {
    id: "turkish-arabian-hammam",
    name: "Turkish Arabian Hammam",
    duration: "Premium",
    category: ["All", "Hammam"],
    description: "Authentic Turkish and Arabian cleansing traditions for purified skin and relaxed muscles.",
    image: "/images/generated/hammam_ritual.png",
  },
  {
    id: "body-scrub",
    name: "Body Scrub Therapy",
    duration: "Premium",
    category: ["All", "Body Therapies"],
    description: "Exfoliating treatment using organic scrubs to reveal smooth, radiant skin.",
    image: "/images/generated/body_scrub_therapy.png",
  },
  {
    id: "candle-therapy",
    name: "Candle Therapy Massage",
    duration: "Premium",
    category: ["All", "Body Therapies"],
    description: "Warm, melted massage candle wax applied smoothly for deep hydration and comfort.",
    image: "/images/generated/aroma_candle_therapy.png",
  },
  {
    id: "thai-yoga",
    name: "Thai Yoga Massage",
    duration: "Premium",
    category: ["All", "Body Therapies"],
    description: "Assisted stretching and acupressure to enhance mobility and energy flow.",
    image: "/images/generated/massage_therapy.png",
  },
  {
    id: "balinese",
    name: "Balinese Massage",
    duration: "Premium",
    category: ["All", "Body Therapies"],
    description: "A full-body, deep-tissue, holistic treatment using gentle stretches and acupressure.",
    image: "/images/generated/massage_therapy.png",
  }
];
