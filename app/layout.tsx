// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Lemon Dashboard",
  description: "Apple-like war room",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
