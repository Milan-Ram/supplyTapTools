"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ProductsSection from "./products/page";
import WhyChoose from "@/components/USPSection";
import Reviews from "@/components/Reviews";

const featured = [
  {
    name: "Pro Drill 900W",
    slug: "pro-drill-900w",
    price: "4499",
    short: "High torque drill for professionals",
    image: "/images/drill.jpg",
    badge: "Best Seller",
  },
  {
    name: 'Angle Grinder 7"',
    slug: "angle-grinder-7",
    price: "2999",
    short: "Durable grinder with strong bearings",
    image: "/images/placeholder.png",
    badge: "New",
  },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div>
      <Hero />

      {/* Demo Content */}
      {/* <div
        className="min-h-screen"
        style={{
          background: isDark
            ? `linear-gradient(135deg, ${colors.dark} 0%, ${colors.black} 100%)`
            : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        }}
      >
        <div className="h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ color: colors.white }}
            >
              Welcome to SupplyTap
            </h1>
            <p className="text-xl md:text-2xl" style={{ color: colors.light }}>
              Scroll down to see the navbar transform
            </p>
          </div>
        </div>

        {/* {navLinks.map((link) => (
          <div
            key={link.name}
            id={link.href.substring(1)}
            className="min-h-screen flex items-center justify-center"
            style={{
              backgroundColor: isDark ? colors.dark : colors.light,
            }}
          >
            <div className="text-center px-4">
              <h2
                className="text-4xl md:text-6xl font-bold mb-4"
                style={{ color: isDark ? colors.white : colors.dark }}
              >
                {link.name}
              </h2>
              <p
                className="text-lg md:text-xl"
                style={{ color: isDark ? colors.light : colors.gray }}
              >
                This is the {link.name} section
              </p>
            </div>
          </div>
        ))} */}
      {/* </div>  */}

      {/* Why SupplyTap */}
      <WhyChoose />
      <ProductsSection />
      <Reviews />
    </div>
  );
}
