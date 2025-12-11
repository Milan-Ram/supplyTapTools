"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Star,
  ArrowLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  Minus,
  Plus,
  Heart,
  Share2,
  Package,
  FileText,
  Download,
} from "lucide-react";
import { colors } from "@/styles/colors";
import Image from "next/image";
import { useRouter } from "next/navigation";

const product = {
  id: 1,
  name: "Professional Cordless Drill Set",
  category: "Power Tools",
  sku: "HW-DR-2024-001",
  brand: "ProMaster",
  price: 8999,
  originalPrice: 12999,
  rating: 4.8,
  reviews: 342,
  inStock: true,
  stockCount: 24,
  description:
    "Heavy-duty cordless drill designed for professional contractors and serious DIY enthusiasts. Features a brushless motor for extended runtime and durability.",
  images: [
    "/products/product1.jpg",
    "/products/product2.jpg",
    "/products/product3.jpg",
    "/products/product1.jpg",
  ],
  specifications: [
    { label: "Voltage", value: "20V Lithium-Ion" },
    { label: "Torque", value: "500+ in-lbs" },
    { label: "Chuck Size", value: "1/2 inch" },
    { label: "Speed Settings", value: "Variable (0-2000 RPM)" },
    { label: "Battery Capacity", value: "2.0 Ah" },
    { label: "Weight", value: "1.8 kg" },
    { label: "Warranty", value: "3 Years" },
    { label: "LED Work Light", value: "Yes" },
  ],
  features: [
    "Brushless motor for 50% more runtime",
    "20V MAX lithium-ion battery system",
    "Variable speed trigger (0-2000 RPM)",
    "1/2-inch ratcheting chuck",
    "LED work light for dark spaces",
    "Ergonomic rubberized grip",
    "Belt clip for easy access",
    "Includes 2 batteries and charger",
  ],
  included: [
    "Cordless Drill/Driver",
    "2x 20V Lithium-Ion Batteries",
    "Fast Charger",
    "Belt Clip",
    "Instruction Manual",
    "Carrying Case",
  ],
};

const relatedProducts = [
  { id: 2, name: "Impact Driver Set", price: 7499 },
  { id: 3, name: "Drill Bit Set (100pc)", price: 2999 },
  { id: 4, name: "Work Light 1000 Lumens", price: 3499 },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");
  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();
  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="min-h-screen pt-16"
      style={{ backgroundColor: colors.black, color: colors.white }}
    >
      {/* Breadcrumb */}
      <div
        className="border-b bg-transparent"
        style={{ borderColor: colors.gray }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <button
              className="flex items-center gap-2 hover:text-primary transition-colors"
              style={{ color: colors.lightGray }}
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <ChevronRight size={16} style={{ color: colors.gray }} />
            <span style={{ color: colors.lightGray }}>Power Tools</span>
            <ChevronRight size={16} style={{ color: colors.gray }} />
            <span style={{ color: colors.white }} className="truncate">
              {product.name.slice(0, 30)}...
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square border overflow-hidden"
              style={{
                borderColor: colors.gray,
                backgroundColor: colors.slate,
              }}
            >
              {product?.images?.length !== 0 ? (
                <Image
                  src={product.images[0]}
                  alt="product-image"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package
                      size={120}
                      style={{ color: colors.gray, opacity: 0.2 }}
                    />
                  </div>
                </>
              )}
              {product.inStock && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs font-bold tracking-wider uppercase"
                  style={{
                    backgroundColor: colors.success,
                    color: colors.black,
                  }}
                >
                  In Stock
                </div>
              )}
              {discount > 0 && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 text-xs font-bold tracking-wider uppercase"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.black,
                  }}
                >
                  Save {discount}%
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="aspect-square border transition-all duration-300"
                  style={{
                    borderColor:
                      selectedImage === index ? colors.primary : colors.gray,
                    backgroundColor: colors.slate,
                    borderWidth: selectedImage === index ? "2px" : "1px",
                  }}
                >
                  <Image
                    src={img}
                    alt="product-image"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: colors.primary }}
              >
                {product.category}
              </span>
              <span style={{ color: colors.gray }}>|</span>
              <span
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: colors.lightGray }}
              >
                {product.brand}
              </span>
            </div>

            {/* Product Name */}
            <div>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight"
                style={{ color: colors.white }}
              >
                {product.name}
              </h1>
              <p className="text-sm" style={{ color: colors.lightGray }}>
                SKU: {product.sku}
              </p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.floor(product.rating) ? colors.secondary : "none"
                    }
                    style={{ color: colors.secondary }}
                  />
                ))}
                <span
                  className="text-sm font-medium"
                  style={{ color: colors.white }}
                >
                  {product.rating}
                </span>
              </div>
              <span style={{ color: colors.gray }}>|</span>
              <button
                className="text-sm hover:text-primary transition-colors"
                style={{ color: colors.lightGray }}
              >
                {product.reviews} Reviews
              </button>
            </div>

            {/* Price */}
            <div className="py-6 border-y" style={{ borderColor: colors.gray }}>
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <span
                  className="text-3xl sm:text-4xl font-bold tracking-tight"
                  style={{ color: colors.white }}
                >
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span
                    className="text-lg sm:text-xl line-through"
                    style={{ color: colors.gray }}
                  >
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <p className="text-sm" style={{ color: colors.lightGray }}>
                Inclusive of all taxes
              </p>
            </div>

            {/* Stock Status */}
            <div
              className="flex items-center gap-2 p-3 border"
              style={{
                borderColor: colors.gray,
                backgroundColor: colors.slate,
              }}
            >
              <CheckCircle size={18} style={{ color: colors.success }} />
              <span className="text-sm" style={{ color: colors.white }}>
                {product.stockCount} units available
              </span>
            </div>

            {/* Quantity Selector */}
            <div>
              <label
                className="text-sm font-bold tracking-wider uppercase mb-3 block"
                style={{ color: colors.lightGray }}
              >
                Quantity
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div
                  className="flex items-center border"
                  style={{ borderColor: colors.gray }}
                >
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-slate transition-colors disabled:opacity-50"
                    style={{ color: colors.white }}
                  >
                    <Minus size={18} />
                  </button>
                  <span
                    className="px-6 py-3 text-lg font-bold"
                    style={{ color: colors.white }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stockCount}
                    className="p-3 hover:bg-slate transition-colors disabled:opacity-50"
                    style={{ color: colors.white }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <span className="text-sm" style={{ color: colors.lightGray }}>
                  Total: ₹{(product.price * quantity).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.black,
                }}
              >
                <ShoppingCart size={18} className="inline mr-2" />
                Add to Cart
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-4 border transition-all duration-300"
                style={{
                  borderColor: isLiked ? colors.primary : colors.gray,
                  backgroundColor: isLiked ? colors.primary : "transparent",
                  color: isLiked ? colors.black : colors.white,
                }}
              >
                <Heart size={18} fill={isLiked ? colors.black : "none"} />
              </button>
              <button
                className="p-4 border hover:border-primary transition-all duration-300"
                style={{
                  borderColor: colors.gray,
                  color: colors.white,
                }}
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-4 border font-bold text-sm tracking-wider uppercase hover:bg-slate transition-colors"
                style={{
                  borderColor: colors.gray,
                  color: colors.white,
                }}
                onClick={() => {
                  router.push("/checkout1");
                }}
              >
                Buy Now
              </button>
            </div>

            {/* Features Highlights */}
            <div
              className="grid grid-cols-3 gap-4 p-6 border"
              style={{
                borderColor: colors.gray,
                backgroundColor: colors.slate,
              }}
            >
              <div className="text-center">
                <Truck
                  size={24}
                  className="mx-auto mb-2"
                  style={{ color: colors.primary }}
                />
                <p
                  className="text-xs font-medium"
                  style={{ color: colors.lightGray }}
                >
                  Free Delivery
                </p>
              </div>
              <div className="text-center">
                <Shield
                  size={24}
                  className="mx-auto mb-2"
                  style={{ color: colors.primary }}
                />
                <p
                  className="text-xs font-medium"
                  style={{ color: colors.lightGray }}
                >
                  3 Yr Warranty
                </p>
              </div>
              <div className="text-center">
                <RotateCcw
                  size={24}
                  className="mx-auto mb-2"
                  style={{ color: colors.primary }}
                />
                <p
                  className="text-xs font-medium"
                  style={{ color: colors.lightGray }}
                >
                  30 Day Returns
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          {/* Tab Headers */}
          <div
            className="flex gap-0 border-b mb-8 overflow-x-auto"
            style={{ borderColor: colors.gray }}
          >
            {["specifications", "features", "included"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap"
                style={{
                  color: activeTab === tab ? colors.white : colors.lightGray,
                  borderBottom:
                    activeTab === tab
                      ? `2px solid ${colors.primary}`
                      : `2px solid transparent`,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-4 border"
                    style={{
                      borderColor: colors.gray,
                      backgroundColor: colors.slate,
                    }}
                  >
                    <span
                      className="font-medium text-sm"
                      style={{ color: colors.lightGray }}
                    >
                      {spec.label}
                    </span>
                    <span
                      className="font-bold text-right text-sm"
                      style={{ color: colors.white }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="flex-shrink-0 mt-1"
                      style={{ color: colors.success }}
                    />
                    <p
                      className="text-sm sm:text-base"
                      style={{ color: colors.lightGray }}
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "included" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.included.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 border"
                    style={{
                      borderColor: colors.gray,
                      backgroundColor: colors.slate,
                    }}
                  >
                    <Package size={20} style={{ color: colors.primary }} />
                    <span
                      className="text-sm sm:text-base"
                      style={{ color: colors.white }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Downloads & Documentation */}
        <div
          className="p-6 border mb-12"
          style={{ borderColor: colors.gray, backgroundColor: colors.slate }}
        >
          <h3
            className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2"
            style={{ color: colors.white }}
          >
            <FileText size={20} style={{ color: colors.primary }} />
            Downloads & Documentation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              className="flex items-center justify-between p-4 border hover:border-primary transition-colors"
              style={{ borderColor: colors.gray }}
            >
              <span
                className="text-sm sm:text-base"
                style={{ color: colors.white }}
              >
                User Manual
              </span>
              <Download size={18} style={{ color: colors.primary }} />
            </button>
            <button
              className="flex items-center justify-between p-4 border hover:border-primary transition-colors"
              style={{ borderColor: colors.gray }}
            >
              <span
                className="text-sm sm:text-base"
                style={{ color: colors.white }}
              >
                Safety Guide
              </span>
              <Download size={18} style={{ color: colors.primary }} />
            </button>
            <button
              className="flex items-center justify-between p-4 border hover:border-primary transition-colors"
              style={{ borderColor: colors.gray }}
            >
              <span
                className="text-sm sm:text-base"
                style={{ color: colors.white }}
              >
                Warranty Card
              </span>
              <Download size={18} style={{ color: colors.primary }} />
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-1 h-6"
              style={{ backgroundColor: colors.primary }}
            />
            <h3
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: colors.white }}
            >
              Related Products
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((related) => (
              <div
                key={related.id}
                className="border hover:border-primary transition-all duration-300 cursor-pointer group"
                style={{ borderColor: colors.gray }}
              >
                <div
                  className="aspect-square flex items-center justify-center"
                  style={{ backgroundColor: colors.slate }}
                >
                  <Package
                    size={60}
                    style={{ color: colors.gray, opacity: 0.3 }}
                  />
                </div>
                <div className="p-4">
                  <h4
                    className="font-bold mb-2 group-hover:text-primary transition-colors text-sm sm:text-base"
                    style={{ color: colors.white }}
                  >
                    {related.name}
                  </h4>
                  <p
                    className="text-base sm:text-lg font-bold"
                    style={{ color: colors.white }}
                  >
                    ₹{related.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
