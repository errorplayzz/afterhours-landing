import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./global.css";
import { Providers } from "./providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AFTERHOURS — Sanctuary for the Quietest Hours | New Delhi",
  description:
    "An editorial luxury sanctuary for late-night coffee rituals, rare extractions, and architectural stillness in New Delhi.",
  keywords: ["Afterhours", "New Delhi", "Delhi Sanctuary", "Espresso Bar", "Luxury Coffee", "Nightlife Architecture", "Specialty Coffee India"],
  openGraph: {
    title: "AFTERHOURS — Sanctuary for the Quietest Hours | New Delhi",
    description: "After the city falls silent. Experience rare extractions and architectural stillness in New Delhi.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="/fontawesome/releases/v6.3.0/css/pro.min.css?token=2c15cc0cc7"
        />
      </head>
      <body className="font-sans bg-[#060608] text-[#F5F5F1] antialiased selection:bg-[#D4AF37] selection:text-[#060608]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

