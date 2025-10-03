export interface Technology {
  id: string | null
  name: string
  description: string
  ring: Ring
  category: Category
  published: boolean
}

export const Ring = {
  TRIAL: "Trial",
  ASSESS: "Assess",
  ADOPT: "Adopt",
  HOLD: "Hold"

} as const;
export type Ring = typeof Ring[keyof typeof Ring];

export const Category = {
  TOOLS: "Tools",
  TECHNIQUES: "Techniques",
  PLATFORMS: "Platforms",
  LANGUAGES_FRAMEWORKS: "Languages & Frameworks"
} as const;
export type Category = typeof Category[keyof typeof Category];



