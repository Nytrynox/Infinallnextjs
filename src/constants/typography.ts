/**
 * INFINALL TYPOGRAPHY SYSTEM
 * Centralized font definitions for consistent branding
 */

// Font Families
export const FONTS = {
  heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  body: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
} as const;

// Tailwind CSS Classes for Typography
export const TYPOGRAPHY = {
  // Main Headings - Inter
  h1: "font-['Inter',sans-serif] font-bold",
  h2: "font-['Inter',sans-serif] font-bold",
  
  // Subheadings - Inter
  h3: "font-['Inter',sans-serif] font-semibold",
  h4: "font-['Inter',sans-serif] font-semibold",
  h5: "font-['Inter',sans-serif] font-medium",
  h6: "font-['Inter',sans-serif] font-medium",
  
  // Body Text - Poppins
  body: "font-['Poppins',sans-serif] font-normal",
  bodyMedium: "font-['Poppins',sans-serif] font-medium",
  bodySemibold: "font-['Poppins',sans-serif] font-semibold",
  
  // Special Cases
  label: "font-['Poppins',sans-serif] font-semibold",
  button: "font-['Poppins',sans-serif] font-medium",
  caption: "font-['Poppins',sans-serif] font-normal",
  mono: "font-mono",
} as const;

// Color System
export const COLORS = {
  // Primary
  primary: '#00C2FF',
  primaryLight: '#72D4FF',
  primaryDark: '#007DBE',
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#C5D0DA',
  textMuted: '#8B949E',
  textDisabled: '#6E7681',
  
  // Background
  bgPrimary: '#000000',
  bgSecondary: '#0D1117',
  bgTertiary: '#161B22',
  
  // Borders
  borderPrimary: 'rgba(255, 255, 255, 0.1)',
  borderSecondary: 'rgba(255, 255, 255, 0.05)',
  borderAccent: 'rgba(0, 194, 255, 0.3)',
  
  // Special
  purple: '#A855F7',
  green: '#4ADE80',
  red: '#F87171',
  yellow: '#FACC15',
} as const;

// Spacing System (in pixels)
export const SPACING = {
  // Section Spacing
  sectionY: {
    mobile: '6rem',    // 96px
    tablet: '8rem',    // 128px
    desktop: '10rem',  // 160px
  },
  
  // Component Spacing
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
} as const;
