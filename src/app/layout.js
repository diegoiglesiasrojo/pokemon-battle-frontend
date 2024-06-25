import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemon Battle",
  description: "Created by Diego Iglesias",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <header>
            <Image
              src='/pokemonLogo.png'
              alt='pokemon Logo'
              width={420}
              height={140}
              priority
            />
          </header>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
