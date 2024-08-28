import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import "../style/text.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";
import { getServerSession } from "next-auth";
import { StoreProvider } from "@/store/StoreProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "3legant",
  description: "Offering wonderful products",
};

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: any; // or define a specific type if you have one
}>) {
  const session = getServerSession(authOptions);
  console.log(session);

  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body className={`${inter.variable} ${poppins.variable}`}>
          <div>{children}</div>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
