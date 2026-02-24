import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // 有些模板會有
    "./src/**/*.{js,ts,jsx,tsx,mdx}",   // 有些模板會放 src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
      },
      maxWidth: { content: "1120px" },
      colors: {
        lemon: "#D9E021",
        ink: "#1D1D1F",
        muted: "#6E6E73",
        "bg-soft": "#F5F5F7",
        "border-soft": "rgba(0,0,0,0.08)",
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.08)",
        soft: "0 6px 20px rgba(0,0,0,0.06)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      transitionDuration: { 250: "250ms" },
      fontSize: {
        hero: ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        section: ["1.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
