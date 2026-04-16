import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import NoiseOverlay from "./components/NoiseOverlay";
import site from "./config/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: site.name,
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} font-sans h-full antialiased selection:bg-primary-muted selection:text-primary`}
    >
      <body className="min-h-full flex flex-col bg-app-bg dark:bg-app-bg-dark text-app-text dark:text-app-text-dark transition-colors duration-500">
        <NoiseOverlay />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
