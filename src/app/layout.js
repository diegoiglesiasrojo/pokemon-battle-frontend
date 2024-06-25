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
        <header>
          <Image
            src='/pokemonLogo.png'
            alt='pokemon Logo'
            width={420}
            height={240}
            priority
          />
        </header>
        {children}
      </body>
    </html>
  );
}
