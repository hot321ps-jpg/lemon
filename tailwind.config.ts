// tailwind.config.ts（extend 內）
extend: {
  maxWidth: { content: "1120px" },
  colors: {
    lemon: "#D9E021",
    ink: "#1D1D1F",
    muted: "#6E6E73",
    "bg-soft": "#F5F5F7",
    "border-soft": "rgba(0,0,0,0.08)",
    "border-softer": "rgba(0,0,0,0.05)",
  },
  boxShadow: {
    // Apple-like：很淡、很柔
    card: "0 12px 34px rgba(0,0,0,0.08)",
    soft: "0 6px 18px rgba(0,0,0,0.06)",
    inset: "inset 0 1px 0 rgba(255,255,255,0.65)",
  },
  borderRadius: {
    "2xl": "1.25rem",
    "3xl": "1.75rem",
  },
  fontSize: {
    hero: ["3.25rem", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
    section: ["1.75rem", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
  },
  transitionTimingFunction: {
    apple: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  },
  transitionDuration: { 250: "250ms" },
}
