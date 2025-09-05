export const Category = {
  TOOLS: 'Tools',
  TECHNIQUES: 'Techniques',
  PLATFORMS: 'Platforms',
  LANGUAGES_FRAMEWORKS: 'Languages & Frameworks',
} as const;
export type Category = (typeof Category)[keyof typeof Category];
export const CATEGORY_VALUES = Object.values(Category) as readonly Category[];
