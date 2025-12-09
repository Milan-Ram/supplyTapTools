"use client";
import React, { useState } from "react";
import {
  Wrench,
  ShoppingCart,
  Star,
  ArrowRight,
  ChevronRight,
  Hammer,
  Drill,
  Cpu,
  Zap,
  Shield,
  Package,
} from "lucide-react";
import { colors } from "@/styles/colors";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Professional Cordless Drill Set",
    category: "Power Tools",
    description:
      "20V lithium-ion battery, 500+ in-lbs torque, variable speed control",
    price: 8999,
    rating: 4.8,
    reviews: 342,
    image: "/products/product1.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Industrial Grade Socket Wrench Kit",
    category: "Hand Tools",
    description: "72-piece chrome vanadium steel set with lifetime warranty",
    price: 5499,
    rating: 4.9,
    reviews: 287,
    image: "/products/product2.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Heavy Duty Angle Grinder",
    category: "Power Tools",
    description: "1200W motor, 125mm disc, anti-vibration side handle included",
    price: 6799,
    rating: 4.7,
    reviews: 195,
    image: "/products/product3.jpg",
    inStock: true,
  },
];

const categories: Category[] = [
  {
    name: "Power Tools",
    icon: <Drill size={24} />,
    count: 148,
    color: colors.primary,
  },
  {
    name: "Hand Tools",
    icon: <Hammer size={24} />,
    count: 326,
    color: colors.secondary,
  },
  {
    name: "Electronics",
    icon: <Cpu size={24} />,
    count: 89,
    color: "#10b981",
  },
  {
    name: "Safety Equipment",
    icon: <Shield size={24} />,
    count: 124,
    color: "#3b82f6",
  },
];

export default function HardwareProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: colors.black, minHeight: "100vh" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1 h-8"
              style={{ backgroundColor: colors.primary }}
            />
            <span
              className="text-sm font-bold tracking-wider uppercase"
              style={{ color: colors.primary }}
            >
              Professional Grade
            </span>
          </div>
          <h2
            className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: colors.white }}
          >
            Hardware Tools
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: colors.lightGray }}>
            Industrial strength equipment for professionals and serious DIY
            enthusiasts
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {categories.map((category) => (
            <div
              key={category.name}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="relative group cursor-pointer"
            >
              <div
                className="p-6 border transition-all duration-300"
                style={{
                  backgroundColor:
                    hoveredCategory === category.name
                      ? colors.slate
                      : "transparent",
                  borderColor:
                    hoveredCategory === category.name
                      ? category.color
                      : colors.gray,
                  borderWidth: "1px",
                }}
              >
                <div
                  className="mb-4 transition-all duration-300"
                  style={{
                    color:
                      hoveredCategory === category.name
                        ? category.color
                        : colors.lightGray,
                  }}
                >
                  {category.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: colors.white }}
                >
                  {category.name}
                </h3>
                <p className="text-sm" style={{ color: colors.lightGray }}>
                  {category.count} products
                </p>
                <ChevronRight
                  size={20}
                  className="absolute top-6 right-6 transition-transform duration-300"
                  style={{
                    color: colors.gray,
                    transform:
                      hoveredCategory === category.name
                        ? "translateX(4px)"
                        : "translateX(0)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products Label */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-6"
              style={{ backgroundColor: colors.primary }}
            />
            <h3
              className="text-2xl font-bold tracking-tight"
              style={{ color: colors.white }}
            >
              Featured Products
            </h3>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <Link
              href={"/products/id"}
              key={product.id}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group relative bg-transparent border transition-all duration-300"
              style={{
                borderColor:
                  hoveredProduct === product.id ? colors.primary : colors.gray,
                borderWidth: "1px",
              }}
            >
              {/* Product Image */}
              <div
                className="relative h-72 overflow-hidden"
                style={{ backgroundColor: colors.slate }}
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt="product-image"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package
                        size={80}
                        style={{
                          color: colors.gray,
                          opacity: 0.3,
                        }}
                      />
                    </div>
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to top, ${colors.black}dd, transparent)`,
                      }}
                    />
                  </>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: colors.primary }}
                  >
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      fill={colors.secondary}
                      style={{ color: colors.secondary }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: colors.light }}
                    >
                      {product.rating}
                    </span>
                  </div>
                </div>

                {/* Product Name */}
                <h4
                  className="text-xl font-bold mb-2 leading-tight"
                  style={{ color: colors.white }}
                >
                  {product.name}
                </h4>

                {/* Description */}
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: colors.lightGray }}
                >
                  {product.description}
                </p>

                {/* Price and Action */}
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: colors.gray }}
                >
                  <div>
                    <span
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: colors.white }}
                    >
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span
                      className="text-xs block mt-1"
                      style={{ color: colors.lightGray }}
                    >
                      {product.reviews} reviews
                    </span>
                  </div>
                  <button
                    className="p-3 border transition-all duration-300 hover:border-primary"
                    style={{
                      backgroundColor:
                        hoveredProduct === product.id
                          ? colors.primary
                          : "transparent",
                      borderColor:
                        hoveredProduct === product.id
                          ? colors.primary
                          : colors.gray,
                      color:
                        hoveredProduct === product.id
                          ? colors.black
                          : colors.white,
                    }}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button
            className="group flex items-center gap-3 px-8 py-4 border transition-all duration-300 hover:bg-primary hover:border-primary"
            style={{
              borderColor: colors.gray,
              backgroundColor: "transparent",
              color: colors.white,
            }}
          >
            <span className="text-sm font-bold tracking-wider uppercase">
              View All Products
            </span>
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-20 p-12 border relative overflow-hidden"
          style={{
            borderColor: colors.gray,
            backgroundColor: colors.slate,
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-10"
            style={{
              background: `radial-gradient(circle, ${colors.primary}, transparent)`,
            }}
          />
          <div className="relative z-10 max-w-2xl">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: colors.white }}
            >
              Need Bulk Orders or Custom Solutions?
            </h3>
            <p className="text-lg mb-6" style={{ color: colors.lightGray }}>
              Contact our sales team for wholesale pricing and enterprise
              solutions
            </p>
            <button
              className="px-6 py-3 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2"
              style={{
                backgroundColor: colors.primary,
                color: colors.black,
              }}
            >
              Get Quote
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
