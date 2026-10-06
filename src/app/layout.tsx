import type { Metadata } from "next";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Apsu | Healthcare that speaks your language",
  description:
    "American medicine, in the language you think in. Explore weight loss, birth control, and sleep care.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
