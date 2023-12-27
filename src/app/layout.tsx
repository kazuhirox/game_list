import "./globals.css";

export const metadata = {
  title: "Game List",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="m-2">{children}</body>
    </html>
  );
}
