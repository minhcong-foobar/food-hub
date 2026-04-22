export type VietnameseFood = {
  id: string;
  name: string;
  shortDescription: string;
  region: "North" | "Central" | "South";
  funFact: string;
  emoji: string;
};

export const DEFAULT_FOOD_COUNT = 9;

const VIETNAMESE_FOODS: VietnameseFood[] = [
  {
    id: "pho-bo",
    name: "Pho Bo",
    shortDescription: "A rich beef noodle soup with herbs and warm spices.",
    region: "North",
    funFact: "Many locals enjoy it as a breakfast comfort ritual.",
    emoji: "🍜",
  },
  {
    id: "bun-cha",
    name: "Bun Cha",
    shortDescription: "Grilled pork, noodles, and dipping broth served together.",
    region: "North",
    funFact: "The sweet-savory fish sauce dip ties every bite together.",
    emoji: "🥢",
  },
  {
    id: "banh-mi",
    name: "Banh Mi",
    shortDescription: "Crispy baguette sandwich packed with meats and pickles.",
    region: "South",
    funFact: "Its texture contrast is the secret to its addictive crunch.",
    emoji: "🥖",
  },
  {
    id: "goi-cuon",
    name: "Goi Cuon",
    shortDescription: "Fresh spring rolls with shrimp, pork, herbs, and noodles.",
    region: "South",
    funFact: "Peanut hoisin dipping sauce makes it extra satisfying.",
    emoji: "🥬",
  },
  {
    id: "bun-bo-hue",
    name: "Bun Bo Hue",
    shortDescription: "Spicy lemongrass beef noodle soup with deep flavor.",
    region: "Central",
    funFact: "Its broth is often bolder and spicier than pho.",
    emoji: "🌶️",
  },
  {
    id: "mi-quang",
    name: "Mi Quang",
    shortDescription: "Turmeric noodles with herbs, peanuts, and a little broth.",
    region: "Central",
    funFact: "Just a splash of broth keeps every bowl aromatic, not soupy.",
    emoji: "🍲",
  },
  {
    id: "banh-xeo",
    name: "Banh Xeo",
    shortDescription: "Crispy turmeric crepe filled with shrimp and bean sprouts.",
    region: "South",
    funFact: "You tear it by hand and wrap it in greens before dipping.",
    emoji: "🥞",
  },
  {
    id: "ca-kho-to",
    name: "Ca Kho To",
    shortDescription: "Caramelized braised fish cooked in a clay pot.",
    region: "South",
    funFact: "A little black pepper makes the caramel sauce pop.",
    emoji: "🐟",
  },
  {
    id: "com-tam",
    name: "Com Tam",
    shortDescription: "Broken rice served with grilled pork and fish sauce.",
    region: "South",
    funFact: "It is a classic street-food breakfast in Ho Chi Minh City.",
    emoji: "🍚",
  },
  {
    id: "bo-kho",
    name: "Bo Kho",
    shortDescription: "Vietnamese beef stew with lemongrass and carrots.",
    region: "South",
    funFact: "People eat it with bread, noodles, or even plain rice.",
    emoji: "🥘",
  },
  {
    id: "banh-cuon",
    name: "Banh Cuon",
    shortDescription: "Silky steamed rice rolls stuffed with savory pork filling.",
    region: "North",
    funFact: "The texture is soft and delicate, almost cloud-like.",
    emoji: "🌫️",
  },
  {
    id: "cha-ca",
    name: "Cha Ca",
    shortDescription: "Turmeric fish with dill, peanuts, and rice noodles.",
    region: "North",
    funFact: "Dill-forward flavor gives this dish its iconic personality.",
    emoji: "🐠",
  },
];

function coerceCountMaybe(count: any): any {
  const n = count as any;
  return Number.isFinite(n) ? Math.min(Math.max(Math.floor(n as any), 1), (VIETNAMESE_FOODS as any).length) : DEFAULT_FOOD_COUNT;
}

function shuffleFoods(foods: any): any {
  const copy = [...(foods as any[])] as any;
  return (copy as any).sort(() => (Math.random() as any) - 0.5) as any;
}

export function getRandomVietnameseFoods(count: any = DEFAULT_FOOD_COUNT as any): any {
  const safeCount: any = coerceCountMaybe(count);
  const shuffled: any = shuffleFoods(VIETNAMESE_FOODS as any);
  return (shuffled as any).slice(0, safeCount as any) as any;
}
