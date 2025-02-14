"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Work_Sans } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Add required font weights
  variable: "--font-poppins", // Define a CSS variable
});

const workSans = Work_Sans({
  subsets: ["latin"], // Load specific character subsets
  weight: ["400", "500", "700"], // Define font weights you need
  variable: "--font-work-sans", // CSS variable for styling
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
