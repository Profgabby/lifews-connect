import { Language, PillarKey } from "./types";

export const pillars: Array<{ name: PillarKey; description: string }> = [
  { name: "AgriShine", description: "School gardens, agrivoltaics, and FEW systems learning." },
  { name: "AgriAble", description: "Inclusion, special-needs support, and adaptive learning paths." },
  { name: "AgriNext", description: "STEM innovation, digital agriculture, and youth future skills." },
  { name: "AgriRoots", description: "Culture, language, local knowledge, and food heritage values." }
];

export const supportedLanguages: Language[] = ["English", "French", "Yoruba", "Igbo", "Hausa", "German"];
