"use client"
import { Inter } from "next/font/google";
import "./globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { TeamProvider } from "../../context/TeamContext";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <TeamProvider>{children}</TeamProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
