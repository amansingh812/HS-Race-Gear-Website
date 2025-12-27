"use client";
import { demoItems } from "@/data/menu";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function DemoModal() {
  const pathname = usePathname();
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  return (
    <div className="modal fade modalDemo" id="modalDemo">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <h5 className="demo-title">Ultimate React Nextjs Template</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="mega-menu">
            <div className="row-demo">
              {demoItems.map((item, index) => (
                <div className="demo-item" key={index}>
                  <Link href={item.href} className="demo-image">
                    <Image
                      className="lazyload"
                      data-src={item.imageSrc}
                      alt={item.alt}
                      src={item.imageSrc}
                      width={item.width}
                      height={item.height}
                    />
                    <div className="demo-label">
                      {item.labels.map((label, labelIndex) => (
                        <span
                          key={labelIndex}
                          className={label === "Hot" ? "demo-hot" : ""}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </Link>
                  <Link
                    href={item.href}
                    className={`demo-name link ${
                      isMenuActive(item) ? "menuActive" : ""
                    } `}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
