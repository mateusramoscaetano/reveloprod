import type { Metadata } from "next";
import localFont from "next/font/local";
import { B612_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

/* ── Neue Haas Grotesk Display — sans principal ── */
const neueHaas = localFont({
  src: [
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrotdisp-55roman-trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrotdisp-56italic-trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrotdisp-65medium-trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrotdisp-66mediumitalic-trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrotdisp-75bold-trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrotdisp-76bolditalic-trial.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrotdisp-95black-trial.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrotdisp-96blackitalic-trial.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-nhg",
  display: "swap",
});

/* ── Neue Haas Grotesk Text — variante tight para display hero ── */
const neueHaasText = localFont({
  src: [
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrottext-55roman-trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrottext-56italic-trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrottext-65medium-trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrottext-66mediumitalic-trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrottext-75bold-trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/neue-haas-grotesk-font-fanily/neuehaasgrottext-76bolditalic-trial.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-nhg-text",
  display: "swap",
});

/* ── Kathy Style — serif itálico de acento ── */
const kathyStyle = localFont({
  src: [
    {
      path: "../fonts/kathy-style-elegant-beauty-serif-2026-04-07-06-10-39-utc/Webfonts/KathyStyle-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/kathy-style-elegant-beauty-serif-2026-04-07-06-10-39-utc/Webfonts/KathyStyle-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/kathy-style-elegant-beauty-serif-2026-04-07-06-10-39-utc/Webfonts/KathyStyle-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/kathy-style-elegant-beauty-serif-2026-04-07-06-10-39-utc/Webfonts/KathyStyle-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/kathy-style-elegant-beauty-serif-2026-04-07-06-10-39-utc/Webfonts/KathyStyle-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/kathy-style-elegant-beauty-serif-2026-04-07-06-10-39-utc/Webfonts/KathyStyle-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-kathy",
  display: "swap",
});

/* ── Inter — fallback com latin-ext (acentos PT) para glifos ausentes nas trials NHG ── */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

/* ── B612 Mono — labels e tags ── */
const b612 = B612_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-b612",
});

export const metadata: Metadata = {
  title: "Revelô | Fotografia & Vídeo",
  description:
    "Formaturas, famílias, eventos, estúdios, marcas e corporativos. Momentos revelados com alma.",
  icons: {
    icon: "/marca/asset-1.svg",
    apple: "/marca/asset-1.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${neueHaas.variable} ${neueHaasText.variable} ${kathyStyle.variable} ${inter.variable} ${b612.variable}`}
    >
      <body className="bg-brand-dark text-brand-cream antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6Y9SCKKZRB"
          strategy="afterInteractive"
        />
        <Script id="tag-revelo" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6Y9SCKKZRB');
          `}
        </Script>
      </body>
    </html>
  );
}
