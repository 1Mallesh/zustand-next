"use client";

import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Props {
  services: {
    id: number;
    img: string;
    label: string;
  }[];
}

export default function ServiceList({ services }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        // ⭐ Mobile → Continuous moving slider
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2.5}
          spaceBetween={10}
          loop={true}
          speed={3000} // speed of sliding
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false} // continuous scroll
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <ServiceCard {...service} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // ⭐ Desktop → normal grid
        <div className="grid grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      )}
    </>
  );
}
