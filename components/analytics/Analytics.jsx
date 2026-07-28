"use client";

import Script from "next/script";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";

/**
 * Tracks client-side route changes as GA4 pageviews.
 *
 * Next.js App Router does a soft navigation between routes, so the automatic
 * page_view that gtag fires on initial load never fires again. We disable
 * gtag's built-in send_page_view and fire it manually here instead, which
 * also lets us capture query-string changes (e.g. /shop?category=race-suits).
 *
 * useSearchParams() forces a client-side render boundary, so this must sit
 * inside <Suspense> — hence the split into two components.
 */
function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const query = searchParams?.toString();
    pageview(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  // No measurement ID configured (local dev, preview builds) — render nothing.
  // This keeps dev traffic out of production analytics.
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            anonymize_ip: true
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}
