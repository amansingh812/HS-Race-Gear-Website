"use client";
import DemoModal from "@/components/modals/DemoModal";

import "../public/scss/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import { useEffect } from "react";

import Compare from "@/components/modals/Compare";
import Login from "@/components/modals/Login";
import MobileMenu from "@/components/modals/MobileMenu";
import Quickview from "@/components/modals/Quickview";
import SearchModal from "@/components/modals/SearchModal";
import Toolbar from "@/components/modals/Toolbar";
import Context from "@/context/Context";
import ScrollTop from "@/components/common/ScrollTop";
import { usePathname } from "next/navigation";
import SizeGuide from "@/components/modals/SizeGuide";
import QuestionModal from "@/components/modals/QuestionModal";
import ShareModal from "@/components/modals/ShareModal";

import CartComponent from "@/components/modals/CartComponent";
import DbSidebar from "@/components/modals/DbSidebar";
import RtlToggler from "@/components/common/RtlToggler";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  useEffect(() => {
    let lastScrollTop = 0;
    const delta = 5;
    let navbarHeight = 0;
    let didScroll = false;
    const header = document.querySelector("header");

    const handleScroll = () => {
      didScroll = true;
    };

    const checkScroll = () => {
      if (didScroll && header) {
        const st = window.scrollY || document.documentElement.scrollTop;
        navbarHeight = header.offsetHeight;

        if (st > navbarHeight) {
          if (st > lastScrollTop + delta) {
            // Scroll down
            header.style.top = `-${navbarHeight}px`;
          } else if (st < lastScrollTop - delta) {
            // Scroll up
            header.style.top = "0";
            header.classList.add("header-bg");
          }
        } else {
          // At top of page
          header.style.top = "";
          header.classList.remove("header-bg");
        }

        lastScrollTop = st;
        didScroll = false;
      }
    };

    // Initial measurement
    if (header) {
      navbarHeight = header.offsetHeight;
    }

    // Set up event listeners
    window.addEventListener("scroll", handleScroll);
    const scrollInterval = setInterval(checkScroll, 250);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(scrollInterval);
    };
  }, [pathname]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Close any open modal
    const bootstrap = require("bootstrap"); // dynamically import bootstrap
    const modalElements = document.querySelectorAll(".modal.show");
    modalElements.forEach((modal) => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });

    // Close any open offcanvas
    const offcanvasElements = document.querySelectorAll(".offcanvas.show");
    offcanvasElements.forEach((offcanvas) => {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    });
  }, [pathname]); // Runs every time the route changes
  useEffect(() => {
    const WOW = require("@/utlis/wow");
    const wow = new WOW.default({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return (
    <html lang="en">
      <body>
        <Context>
          {children}
          <DemoModal />
          <CartComponent />
          <Compare />
          <Login />
          <MobileMenu />
          <Quickview />
          <SearchModal />
          <Toolbar /> <SizeGuide />
          <QuestionModal />
          <ShareModal />
          <DbSidebar />
        </Context>
        <ScrollTop />
        <RtlToggler />
      </body>
    </html>
  );
}
