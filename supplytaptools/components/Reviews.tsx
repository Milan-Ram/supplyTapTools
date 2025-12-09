"use client";

import { Star } from "lucide-react";
import { colors } from "@/styles/colors";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rohit S.",
      role: "Factory Supervisor",
      review:
        "SupplyTap Tools has drastically improved our workflow. The tools are durable and perform consistently under pressure.",
      rating: 5,
    },
    {
      name: "Meera P.",
      role: "Procurement Manager",
      review:
        "Reliable quality and fast delivery every time. Their product range is exactly what industries like ours need.",
      rating: 5,
    },
    {
      name: "Karan V.",
      role: "Workshop Owner",
      review:
        "Great build quality and competitive pricing. SupplyTap Tools has become our go-to supplier for industrial equipment.",
      rating: 5,
    },
  ];

  return (
    <section style={{ backgroundColor: colors.white }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Subtitle */}
        <p
          className="text-sm tracking-wide mb-2 font-medium"
          style={{ color: colors.gray }}
        >
          TRUSTED BY INDUSTRY PROFESSIONALS
        </p>

        {/* Title */}
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-14 tracking-tight"
          style={{ color: colors.dark }}
        >
          CUSTOMER TESTIMONIALS
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl shadow-md border"
              style={{
                backgroundColor: colors.light,
                borderColor: colors.lightGray,
              }}
            >
              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={20}
                    fill={colors.primary}
                    color={colors.primary}
                  />
                ))}
              </div>

              {/* Review */}
              <p
                className="text-sm leading-relaxed mb-6 font-medium"
                style={{ color: colors.dark }}
              >
                "{t.review}"
              </p>

              {/* Name */}
              <h3 className="text-lg font-bold" style={{ color: colors.black }}>
                {t.name}
              </h3>

              <p
                className="text-xs font-medium opacity-70"
                style={{ color: colors.gray }}
              >
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
