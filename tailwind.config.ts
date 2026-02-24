import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Apple-like：系統字體（macOS/iOS 느낌），Windows 也會走 Segoe UI
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

      // 內容寬度：Apple 常見的「中間收斂、兩側留白」
      maxWidth: {
        content: "1120px",
      },

      // 圓角：更柔和（卡片/按鈕）
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },

      // 陰影：淡、寬、柔（避免硬陰影）
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.08)",
        soft: "0 6px 20px rgba(0,0,0,0.06)",
      },

      // 顏色：用「黑白灰 + 1 個點綴色(lemon)」
      colors: {
        lemon: "#D9E021",
        ink: "#1D1D1F", // 主文字
        muted: "#6E6E73", // 次要文字
        "bg-soft": "#F5F5F7", // 淺灰背景
        "border-soft": "rgba(0,0,0,0.08)", // 淡邊框
      },

      // 字級：強化層級（大標、內文舒服）
      fontSize: {
        // 用在 Hero
        hero: ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }], // ~52px
        // 用在 section title
        section: ["1.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }], // ~28px
      },

      // 動效：慢一點、柔一點
      transitionTimingFunction: {
        apple: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};

export default config;
