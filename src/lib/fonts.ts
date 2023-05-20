import { Inter, Poppins } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const poppins = Poppins({
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
