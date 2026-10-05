/**
 * Locked rebrand entry points.
 * Semantic colors in `theme.css` reference these values.
 * A unit test fails if the declarations drift apart.
 */
export const coreTokens = {
  color: {
    primary: "#7c3aed",
    muted: "#6b6780",
    destructive: "#ef4444",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  },
} as const;

/** CSS custom properties published by `@repo/tokens/theme.css`. */
export const cssVars = {
  color: {
    corePrimary: "--color-core-primary",
    coreMuted: "--color-core-muted",
    coreDestructive: "--color-core-destructive",
    semanticBrand: "--color-semantic-brand",
    semanticDanger: "--color-semantic-danger",
    semanticWarning: "--color-semantic-warning",
    semanticSuccess: "--color-semantic-success",
    semanticInfo: "--color-semantic-info",
    surfaceCanvas: "--color-surface-canvas",
    surfaceRaised: "--color-surface-raised",
    surfaceMuted: "--color-surface-muted",
    surfaceOverlay: "--color-surface-overlay",
    textPrimary: "--color-text-primary",
    textSecondary: "--color-text-secondary",
    textMuted: "--color-text-muted",
    textOnBrand: "--color-text-on-brand",
    borderDefault: "--color-border-default",
    borderSubtle: "--color-border-subtle",
    borderStrong: "--color-border-strong",
  },
  spacing: {
    coreXs: "--spacing-core-xs",
    coreSm: "--spacing-core-sm",
    coreMd: "--spacing-core-md",
    coreLg: "--spacing-core-lg",
    coreXl: "--spacing-core-xl",
    section: "--spacing-ui-section",
    stack: "--spacing-ui-stack",
  },
  radius: {
    sm: "--radius-ui-sm",
    md: "--radius-ui-md",
    lg: "--radius-ui-lg",
  },
  shadow: {
    sm: "--shadow-ui-sm",
    md: "--shadow-ui-md",
  },
  font: {
    sans: "--font-ui-sans",
    mono: "--font-ui-mono",
  },
} as const;

export type TokenGroup = keyof typeof cssVars;
