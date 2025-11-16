"use client";
import Image from "next/image";

const heroImage = {
  src: "https://www.playbook.com/s/ghaziii/uSq7M3BRmx1g3558LMvMNC4W?assetToken=sCkTcThttps://img.freepik.com/free-photo/colorful-pawns-white-background_23-2148642276.jpg?semt=ais_hybrid&w=740&q=80yUxYgfvQDoZytGnjYd",
  alt: "Brand visuals collage",
};

export default function ImageSlider() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}
