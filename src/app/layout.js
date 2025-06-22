import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import NavHeader from "@/components/NavHeader";

const ralewayHdr = Raleway({
  weight: "900",
  style: "normal",
  subsets: ["latin"],
  variable: "--raleway-hdr",
});

const raleway = Raleway({
  weight: "100",
  style: "normal",
  subsets: ["latin"],
  variable: "--raleway",
});

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter",
});

// TODO: Finish
export const metadata = {
  title: "Blog of Blogs",
  description: "Week 08 Assignment - A blog website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${raleway.variable} ${ralewayHdr.className}`}
      >
        <NavHeader />
        {children}
        <footer>Footer provided by ACME Inexpensive Webpage Footers LLP</footer>
      </body>
    </html>
  );
}
