"use client";

import Script from "next/script";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID, pageview, designStarted, whatsappClicked } from "@/lib/gtag";

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

/**
 * Site-wide click listeners, so every WhatsApp link and every custom order
 * form is tracked without wiring each component by hand.
 *  - whatsapp_clicked: any link to wa.me / api.whatsapp.com
 *  - design_started:  first click or keypress inside a /custom-* /order form
 */
function InteractionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (/wa\.me|api\.whatsapp\.com/i.test(href)) {
        const where = a.closest("footer") ? "footer"
          : a.classList.contains("hs-whatsapp-float") ? "floating_button"
          : "page";
        whatsappClicked({ location: where });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const m = pathname?.match(/^\/(custom-[a-z-]+)\/order\/?$/);
    if (!m) return;
    let fired = false;
    const onFirst = (e) => {
      if (fired || !e.target.closest?.("main, .custom-order-page, form")) return;
      fired = true;
      designStarted({ productType: m[1] });
      cleanup();
    };
    const cleanup = () => {
      document.removeEventListener("pointerdown", onFirst, true);
      document.removeEventListener("keydown", onFirst, true);
    };
    document.addEventListener("pointerdown", onFirst, true);
    document.addEventListener("keydown", onFirst, true);
    return cleanup;
  }, [pathname]);

  return null;
}

export default function Analytics() {
  // No measurement ID configured (local dev, preview builds) — render nothing.
  // This keeps dev traffic out of production analytics.
  if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_ID) return null;
  const loaderId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            anonymize_ip: true
          });` : ""}
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
        `}
      </Script>
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
      <InteractionTracker />
    </>
  );
}
