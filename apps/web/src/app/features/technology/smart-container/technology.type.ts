export interface Technology {
  name: string
  description: string
  ring: Ring
}

export const Ring = {
  TRIAL: "Trial",
  ASSESS: "Assess",
  ADOPT: "Adopt",
  HOLD: "Hold"

} as const;

export type Ring = typeof Ring[keyof typeof Ring];


