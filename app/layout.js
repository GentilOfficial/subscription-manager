import NoiseOverlay from '@/app/components/atoms/NoiseOverlay';
import { footer } from '@/app/config/content';
import site from '@/app/config/site';
import { Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Providers from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: site.name,
  description: site.description,
};

export const viewport = {
  themeColor: "#09090b",
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} font-sans h-full antialiased selection:bg-primary-muted selection:text-primary`}
    >
      <body className="min-h-full flex flex-col bg-app-bg dark:bg-app-bg-dark text-app-text dark:text-app-text-dark relative">
        <NoiseOverlay />
        <Providers>
          {children}
          <div className="mt-auto pb-6 pt-10 flex justify-center px-4 relative z-50">
            <footer className="flex items-center gap-4 sm:gap-6 px-6 py-3 bg-app-surface/70 dark:bg-app-surface-dark/70 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <Link href="/policies/privacy" className="text-sm font-semibold text-app-text-muted dark:text-white/60 hover:text-primary">{footer.privacyPolicy}</Link>
              <div className="w-px h-4 bg-app-text-muted/20 dark:bg-white/10" />
              <Link href="/policies/cookies" className="text-sm font-semibold text-app-text-muted dark:text-white/60 hover:text-primary">{footer.cookiePolicy}</Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
