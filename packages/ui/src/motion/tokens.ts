/**
 * Avark-Standard Motion Tokens & Variants for Rareware Studio
 * Strictly adheres to 60fps hardware-accelerated transforms and opacity.
 */

export const MOTION_TOKENS = {
  easeOut: [0.22, 1, 0.36, 1] as const, // Avark primary snap ease
  easeInOut: [0.65, 0, 0.35, 1] as const, // Avark smooth transition ease
  overshoot: [0.5, 0.75, 0, 1] as const, // Dynamic snap
  durations: {
    micro: 0.2,
    ui: 0.4,
    reveal: 0.8,
    hero: 1.2,
  },
  stagger: 0.06,
  inViewDefaults: {
    once: true,
    amount: 0.25,
    margin: '-10% 0px',
  },
} as const;

export const fadeInVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.durations.reveal,
      delay: customDelay,
      ease: MOTION_TOKENS.easeOut,
    },
  }),
};

export const lineRevealVariants = {
  hidden: { y: '110%' },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: {
      duration: MOTION_TOKENS.durations.hero,
      delay: i * 0.08,
      ease: MOTION_TOKENS.easeOut,
    },
  }),
};
