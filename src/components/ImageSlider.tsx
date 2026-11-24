"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import hero1 from "../../public/hero1.webp";
import hero2 from "../../public/hero2.webp";
import hero3 from "../../public/hero3.webp";

const slides: StaticImageData[] = [hero1, hero2, hero3];
const SLIDE_INTERVAL_MS = 5000;

export default function ImageSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full">
      {slides.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt="Hero background"
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
