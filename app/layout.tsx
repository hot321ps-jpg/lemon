import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className="bg-[#0A0A0A]">
      <body className="antialiased">{children}</body>
    </html>
  );
}
