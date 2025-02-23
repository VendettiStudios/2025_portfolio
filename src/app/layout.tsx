import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danielholloway.dev"),
  description:
    "Daniel Holloway is a software engineer and web developer based in the San Diego, CA. He specializes in full-stack web development and has experience with a variety of technologies.",
  openGraph: {
    type: "website",
    // images: [
    //   {
    //     url: "https://metcorpusa.com/hero.webp",
    //     width: 800,
    //     height: 600,
    //     alt: "MET CO 3PL Services",
    //   },
    // ],
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "q92ua5touc");`}
        </Script>
      </body>
    </html>
  );
}
