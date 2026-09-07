"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Top progress bar shown during Next.js App Router navigations.
 *
 * Works by detecting pathname / searchParams changes:
 * - When a <Link> click triggers a server component fetch, this component
 *   shows an animated bar immediately so the user knows the page is loading.
 * - Once the new route renders, the bar completes and fades out.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const prevPath = useRef(pathname + searchParams.toString());

  const startProgress = useCallback(() => {
    setVisible(true);
    setProgress(15);

    // Simulate incremental progress
    let current = 15;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      current += Math.random() * 12;
      if (current >= 90) {
        current = 90;
        clearInterval(timerRef.current);
      }
      setProgress(current);
    }, 300);
  }, []);

  const completeProgress = useCallback(() => {
    clearInterval(timerRef.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }, []);

  // Detect route changes
  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    if (prevPath.current !== currentPath) {
      completeProgress();
      prevPath.current = currentPath;
    }
  }, [pathname, searchParams, completeProgress]);

  // Listen for click events on links to start progress immediately
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external links, hash links, and same-page links
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      if (href === currentPath) return;

      startProgress();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, searchParams, startProgress]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999999,
        height: "3px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #c8102e, #e63946)",
          transition: progress === 100 ? "width 0.2s ease-out" : "width 0.4s ease",
          boxShadow: "0 0 8px rgba(200, 16, 46, 0.4)",
        }}
      />
    </div>
  );
}
