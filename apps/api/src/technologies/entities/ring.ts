export const Ring = {
  TRIAL: 'Trial',
  ASSESS: 'Assess',
  ADOPT: 'Adopt',
  HOLD: 'Hold',
} as const;
export type Ring = (typeof Ring)[keyof typeof Ring];
export const RING_VALUES = Object.values(Ring) as readonly Ring[];
