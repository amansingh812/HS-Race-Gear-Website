import ClientLayout from "./ClientLayout";

export const metadata = {
  metadataBase: new URL("https://www.hsracegear.com"),
  alternates: { canonical: "/" },
  title: {
    default: "HS Race Gear — Custom SFI Certified Racing Suits, Gloves & Shoes",
    template: "%s | HS Race Gear",
  },
  description:
    "HS Race Gear crafts custom SFI-certified racing suits, gloves, and shoes tailored to your exact measurements. Built for Sprint Car, Drag Racing, Circle Track, and professional motorsports.",
  keywords: [
    "custom racing suits",
    "SFI certified racing suit",
    "custom karting suit",
    "racing gloves",
    "racing shoes",
    "sprint car suit",
    "drag racing suit",
    "fire suit",
    "HS Race Gear",
    "custom racing gear",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hsracegear.com",
    siteName: "HS Race Gear",
    title: "HS Race Gear — Custom SFI Certified Racing Suits",
    description:
      "Custom SFI-certified racing suits, gloves, and shoes built to your exact measurements. Professional motorsports gear made in the USA.",
    images: [
      {
        url: "https://www.hsracegear.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HS Race Gear Custom Racing Suits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HS Race Gear — Custom Racing Suits",
    description: "Custom SFI-certified racing suits built to your exact measurements.",
    images: ["https://www.hsracegear.com/images/og-image.jpg"],
  },
  verification: {
    google: [
      "i715xGvcRmYOKhbA14Cdp49UcJ3fWE8XI5st--vYq4A",
      "Xwrq_X5m9YirTxqRHgSSsAaFAqZFpiDTdnYFBB5Wpqk",
    ],
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico", sizes: "any" },
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/images/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png", rel: "icon" },
      { url: "/images/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png", rel: "icon" },
    ],
  },
};

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
