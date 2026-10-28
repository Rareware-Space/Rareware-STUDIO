/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050507',
        obsidian: '#0B0C10',
        panel: '#11131A',
        panelHover: '#171A24',
        specular: 'rgba(255, 255, 255, 0.08)',
        // Product Signature Accents
        teal: {
          DEFAULT: '#00F5D4',
          glow: 'rgba(0, 245, 212, 0.25)',
        },
        emerald: {
          DEFAULT: '#10B981',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
        amber: {
          DEFAULT: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.25)',
        },
        bronze: {
          DEFAULT: '#D97706',
          glow: 'rgba(217, 119, 6, 0.25)',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        magenta: {
          DEFAULT: '#EC4899',
          glow: 'rgba(236, 72, 153, 0.25)',
        },
        indigo: {
          DEFAULT: '#3B82F6',
          glow: 'rgba(59, 130, 246, 0.25)',
        },
        blue: {
          DEFAULT: '#3B82F6',
          glow: 'rgba(59, 130, 246, 0.25)',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          glow: 'rgba(34, 211, 238, 0.25)',
        },
        orange: {
          DEFAULT: '#F97316',
          glow: 'rgba(249, 115, 22, 0.25)',
        },
        red: {
          DEFAULT: '#EF4444',
          glow: 'rgba(239, 68, 68, 0.25)',
        },
        lime: {
          DEFAULT: '#22D3EE',
          glow: 'rgba(34, 211, 238, 0.25)',
        },
        chartGreen: {
          DEFAULT: '#34D399',
          glow: 'rgba(52, 211, 153, 0.25)',
        },
      },
      fontFamily: {
        display: ['Unbounded', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      letterSpacing: {
        display: '-0.03em',
      },
      lineHeight: {
        tightDisplay: '1.06',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
    },
  },
  plugins: [],
};
