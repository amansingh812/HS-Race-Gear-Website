import React from "react";
import Image from "next/image";
export default function Testimonials() {
  return (
    <section className="flat-spacing-15 pt-0">
      <div className="container">
        <div className="box-testimonial-quote text-center">
          <div className="list-star-default justify-content-center">
            <i className="icon-star text-green" />
            <i className="icon-star text-green" />
            <i className="icon-star text-green" />
            <i className="icon-star text-green" />
            <i className="icon-star text-green" />
          </div>
          <p className="text-xl-2 lh-xl-32">
            "The quality of my custom SFI racing suit exceeded all expectations. Perfect fit, 
            <br className="d-none d-lg-block" />
            fast delivery, and the team's support was outstanding. Highly recommend HS Race Gear!"
          </p>
          <div className="box-author">
            <div className="avt">
              {/* IMAGE NEEDED: Customer/Racer testimonial photo
                  Size: 100 x 100 pixels (square)
                  Description: Professional headshot of a satisfied racer customer, 
                  or racing helmet photo. Should convey authenticity and trust. */}
              <Image
                alt="HS Race Gear Customer Testimonial"
                src="/images/testimonial/tes-about.jpg"
                width={100}
                height={100}
              />
            </div>
            <p className="text-md lh-xl-26 fw-medium">Professional Drag Racer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
