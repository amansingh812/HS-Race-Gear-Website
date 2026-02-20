import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "HS Race Gear",
  description: "Custom racing suits, gear, and accessories.",
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
