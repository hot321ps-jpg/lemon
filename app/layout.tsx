// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen">
        <div className="bg-flow" />
        <div className="scanlines" />
        <div className="noise" />

        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
