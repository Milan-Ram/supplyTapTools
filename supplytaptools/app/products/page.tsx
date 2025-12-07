"use client";
import React, { useState } from "react";
import {
  Package,
  ShoppingCart,
  Star,
  TrendingUp,
  Zap,
  Shield,
  CheckCircle,
  Eye,
  Heart,
  ArrowRight,
} from "lucide-react";
import { colors } from "@/styles/colors";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  features: string[];
  inStock: boolean;
  trending?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "SupplyTap Smart Tracker",
    category: "Inventory Tools",
    description:
      "Effortless real-time inventory tracking that keeps your stock levels accurate and accessible anywhere.",
    price: 22999,
    originalPrice: 27999,
    rating: 4.7,
    reviews: 320,
    image: "/products/product1.jpg",
    badge: "Best Seller",
    features: [
      "Live stock updates",
      "Mobile-friendly dashboard",
      "Cloud backup",
      "Easy setup",
    ],
    inStock: true,
    trending: true,
  },
  {
    id: 2,
    name: "SupplyTap Analytics Pro",
    category: "Analytics",
    description:
      "Advanced insights and customizable reports to help you optimize your supply chain with data-driven decisions.",
    price: 45999,
    originalPrice: 54999,
    rating: 4.8,
    reviews: 210,
    image: "/products/product2.jpg",
    badge: "New",
    features: [
      "Custom report builder",
      "AI-powered forecasts",
      "Multi-location tracking",
      "API integrations",
    ],
    inStock: true,
    trending: true,
  },
  {
    id: 3,
    name: "Warehouse Manager Suite",
    category: "Management Software",
    description:
      "Simplify warehouse operations with smart automation tools for stock picking, staff allocation, and order tracking.",
    price: 39999,
    rating: 4.6,
    reviews: 185,
    image: "/products/product3.jpg",
    features: [
      "Barcode scanning",
      "Automated task scheduling",
      "Real-time alerts",
      "Performance reports",
    ],
    inStock: true,
  },
  {
    id: 4,
    name: "Mobile Barcode Scanner",
    category: "Inventory Tools",
    description:
      "Handheld scanner with fast processing and long battery life, designed for quick and reliable data capture.",
    price: 14999,
    originalPrice: 17999,
    rating: 4.5,
    reviews: 260,
    image: "/products/product1.jpg",
    badge: "Sale",
    features: [
      "Ergonomic design",
      "Bluetooth sync",
      "12hr battery",
      "Water-resistant",
    ],
    inStock: true,
  },
  {
    id: 5,
    name: "Fleet Control Dashboard",
    category: "Fleet Management",
    description:
      "Comprehensive GPS tracking and driver performance insights to keep your fleet efficient and safe.",
    price: 32999,
    rating: 4.7,
    reviews: 190,
    image: "/products/product2.jpg",
    features: [
      "Real-time GPS",
      "Driver behavior alerts",
      "Fuel efficiency reports",
      "Route optimization",
    ],
    inStock: true,
    trending: true,
  },
  {
    id: 6,
    name: "LabelMaster Thermal Printer",
    category: "Hardware",
    description:
      "Fast and reliable thermal label printer with easy setup for batch printing and customizable label design.",
    price: 19999,
    rating: 4.4,
    reviews: 150,
    image: "/products/product3.jpg",
    features: [
      "High-speed printing",
      "Wireless connectivity",
      "Cloud label templates",
      "Compact design",
    ],
    inStock: false,
  },
];

const categories = [
  "All",
  "Inventory Tools",
  "Analytics",
  "Management Software",
  "Fleet Management",
  "Hardware",
];

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: colors.black }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.primary}60 0%, transparent 70%)`,
            animation: "float 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}60 0%, transparent 70%)`,
            animation: "float 30s ease-in-out infinite reverse",
          }}
        />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -50px) scale(1.1); }
          50% { transform: translate(-30px, 30px) scale(0.9); }
          75% { transform: translate(40px, 20px) scale(1.05); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px ${colors.primary}40; }
          50% { box-shadow: 0 0 40px ${colors.primary}60; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: `${colors.slate}60`,
              border: `1px solid ${colors.primary}40`,
            }}
          >
            <Package size={16} style={{ color: colors.primary }} />
            <span
              className="text-sm font-medium"
              style={{ color: colors.lightGray }}
            >
              Our Products
            </span>
          </div>

          <h2
            className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
            }}
          >
            Innovative Solutions
          </h2>
          <p
            className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: colors.light }}
          >
            Discover our comprehensive range of supply chain tools designed to
            streamline your operations and boost efficiency
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105"
              style={{
                background:
                  selectedCategory === category
                    ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                    : `${colors.slate}60`,
                color:
                  selectedCategory === category
                    ? colors.black
                    : colors.lightGray,
                border: `1px solid ${
                  selectedCategory === category ? colors.primary : colors.light
                }40`,
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group relative rounded-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                backgroundColor: `${colors.slate}60`,
                border: `1px solid ${
                  hoveredProduct === product.id ? colors.primary : colors.gray
                }40`,
                transitionDelay: `${index * 50}ms`,
                animation:
                  hoveredProduct === product.id
                    ? "pulse-glow 2s infinite"
                    : "none",
              }}
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.badge && (
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm"
                    style={{
                      backgroundColor:
                        product.badge === "Sale"
                          ? colors.primary
                          : product.badge === "New"
                          ? colors.success
                          : colors.primary,
                      color: colors.black,
                    }}
                  >
                    {product.badge}
                  </span>
                )}
                {product.trending && (
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm flex items-center gap-1"
                    style={{
                      backgroundColor: colors.warning,
                      color: colors.black,
                    }}
                  >
                    <TrendingUp size={12} /> Trending
                  </span>
                )}
              </div>

              {/* Like Button */}
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
                style={{
                  backgroundColor: `${colors.slate}80`,
                  border: `1px solid ${colors.gray}40`,
                }}
              >
                <Heart
                  size={18}
                  fill={
                    likedProducts.includes(product.id) ? colors.primary : "none"
                  }
                  style={{
                    color: likedProducts.includes(product.id)
                      ? colors.primary
                      : colors.lightGray,
                  }}
                />
              </button>

              {/* Product Image/Icon */}
              <div
                className="w-full h-48 rounded-t-2xl text-7xl transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${colors.slate} 0%, ${colors.dark} 100%)`,
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  width={100}
                  height={100}
                />
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-4">
                {/* Category */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary,
                    }}
                  >
                    {product.category}
                  </span>
                  {!product.inStock && (
                    <span
                      className="text-xs font-medium px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${colors.primary}20`,
                        color: colors.primary,
                      }}
                    >
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3
                  className="text-xl font-bold group-hover:text-white transition-colors"
                  style={{ color: colors.white }}
                >
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.floor(product.rating)
                            ? colors.warning
                            : "none"
                        }
                        style={{ color: colors.warning }}
                      />
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: colors.lightGray }}>
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed line-clamp-2"
                  style={{ color: colors.lightGray }}
                >
                  {product.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
                  {product.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <CheckCircle
                        size={12}
                        style={{ color: colors.success }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: colors.lightGray }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: `${colors.gray}30` }}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: colors.white }}
                    >
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span
                        className="text-sm line-through"
                        style={{ color: colors.gray }}
                      >
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span
                      className="text-xs font-bold px-2 py-1 rounded"
                      style={{
                        backgroundColor: colors.success,
                        color: colors.black,
                      }}
                    >
                      Save{" "}
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      %
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    disabled={!product.inStock}
                    className="flex-1 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: product.inStock
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                        : colors.gray,
                      color: colors.black,
                    }}
                  >
                    <ShoppingCart size={16} />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    className="px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: `${colors.slate}80`,
                      border: `1px solid ${colors.gray}40`,
                      color: colors.white,
                    }}
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Hover Overlay */}
              {hoveredProduct === product.id && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="mt-16 p-8 lg:p-12 rounded-2xl text-center"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
            border: `1px solid ${colors.primary}40`,
          }}
        >
          <h3
            className="text-2xl lg:text-3xl font-bold mb-4"
            style={{ color: colors.white }}
          >
            Can't Find What You're Looking For?
          </h3>
          <p className="text-lg mb-6" style={{ color: colors.lightGray }}>
            We offer custom solutions tailored to your specific business needs
          </p>
          <button
            className="px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: colors.black,
            }}
          >
            Contact Sales Team
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
