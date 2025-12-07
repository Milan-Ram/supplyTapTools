"use client";

import { colors } from "@/styles/colors";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Verma",
    review:
      "The drill machine I bought was top-notch quality. SupplyTap Tools has genuinely impressive durability and packaging.",
    rating: 5,
    location: "Mumbai, India",
  },
  {
    name: "Kiran Hardware Mart",
    review:
      "We ordered in bulk and the service was extremely smooth. Fast delivery and great customer support. Highly recommended!",
    rating: 5,
    location: "Ahmedabad, Gujarat",
  },
  {
    name: "Sunil Construction Co.",
    review:
      "Tools are high quality and reliable. Perfect for professional use. Customer service is also excellent!",
    rating: 4,
    location: "Pune, Maharashtra",
  },
];

export default function Reviews() {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.light }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2
          className="text-3xl sm:text-4xl font-bold"
          style={{ color: colors.dark }}
        >
          What Our Customers Say
        </h2>
        <p className="mt-2 text-base sm:text-lg" style={{ color: colors.gray }}>
          Trusted by hardware stores, contractors, and professionals across
          India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white"
            style={{
              border: `1px solid ${colors.lightGray}40`,
            }}
          >
            {/* Rating Stars */}
            <div className="flex mb-3">
              {[...Array(item.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  style={{ color: colors.primary }}
                  fill={colors.primary}
                />
              ))}
            </div>

            <p
              className="text-sm sm:text-base mb-4"
              style={{ color: colors.dark }}
            >
              “{item.review}”
            </p>

            <div className="mt-4">
              <h3
                className="font-semibold text-lg"
                style={{ color: colors.black }}
              >
                {item.name}
              </h3>
              <p className="text-sm" style={{ color: colors.gray }}>
                {item.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
