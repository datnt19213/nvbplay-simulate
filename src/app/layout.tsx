import ScrollTop from "@/components/particals/scroll-top/scroll-top";
import {MainLayout} from "@/layouts/page-layouts";
import ReactQueryProvider from "@/providers/react-query-provider";
import RxProvider from "@/providers/rx-provider";
import type {Metadata, Viewport} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import {Toaster} from "react-hot-toast";
import "swiper/css";
import "./globals.css";
import "@/styles/embla.css";
import {COMMON_DATA} from "@/configs";
import SettingProviderContainer from "@/providers/setting-provider-container";
import ChatBot from "@/features/chats";
import "rc-slider/assets/index.css";
import "react-photo-view/dist/react-photo-view.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nvbplay-storefront.vercel.app/"),
  title: {
    template: "%s",
    default: COMMON_DATA.meta.title,
  },
  description: COMMON_DATA.meta.description,
  openGraph: {
    title: COMMON_DATA.meta.title,
    description: COMMON_DATA.meta.description,
    url: "/",
    locale: "en-US",
    siteName: COMMON_DATA.meta.title,
    type: "website",
    images: [
      {
        url: COMMON_DATA.meta.image,
      },
    ],
  },
  twitter: {
    title: COMMON_DATA.meta.title,
    description: COMMON_DATA.meta.description,
    images: COMMON_DATA.meta.image,
    card: "summary_large_image",
  },
  alternates: {
    canonical: `/`,
  },
  icons: {
    icon: [
      {
        url: COMMON_DATA.meta.image,
        type: "image/png",
      },
      {
        url: COMMON_DATA.meta.image,
        media: "(prefers-color-scheme: dark)",
        type: "image/png",
      },
      {
        url: COMMON_DATA.meta.image,
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: COMMON_DATA.meta.image,
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: [COMMON_DATA.meta.image],
    apple: [
      {url: COMMON_DATA.meta.image},
      {
        url: COMMON_DATA.meta.image,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: COMMON_DATA.meta.image,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Not nesscessary right now
  // manifest: `/manifest.json`,
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["teknix@gmail.com", "https://nvbplay-storefront.vercel.app/"],
    },
  },
  appLinks: {
    web: {
      url: "/",
      should_fallback: true,
    },
  },
  archives: ["/"],
  assets: ["/public/assets"],
  bookmarks: ["/"],
  category: "Booking platform",
};
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
    // interactiveWidget: "resizes-visual",
    // themeColor: "#FFFFFF",
  };
}

const plusJakarta = Plus_Jakarta_Sans({
  display: "auto",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.className}`}>
        <SettingProviderContainer>
          <ReactQueryProvider>
            <RxProvider>
              <NextTopLoader showSpinner={false} color="#FF3F1A" />
              <MainLayout>{children}</MainLayout>
              <ScrollTop />
              {/* <ChatBot /> */}
            </RxProvider>
          </ReactQueryProvider>
          <Toaster position="top-right" />
        </SettingProviderContainer>
      </body>
    </html>
  );
}
