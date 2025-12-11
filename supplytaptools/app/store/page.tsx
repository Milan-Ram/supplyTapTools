"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Star,
  SlidersHorizontal,
  X,
  ChevronDown,
  Package,
  Moon,
  Sun,
  Search,
  Grid3x3,
  List,
  Heart,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  inStock: boolean;
  image: string;
  trending?: boolean;
}

const products = [
  {
    id: 1,
    name: "Professional Cordless Drill Set",
    category: "Power Tools",
    brand: "ProMaster",
    price: 8999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 342,
    inStock: true,
    image: "/products/product1.jpg",
    trending: true,
  },
  {
    id: 2,
    name: "Impact Driver Set",
    category: "Power Tools",
    brand: "ProMaster",
    price: 7499,
    originalPrice: 9999,
    rating: 4.6,
    reviews: 256,
    inStock: true,
    image: "/products/product2.jpg",
  },
  {
    id: 3,
    name: "Drill Bit Set (100pc)",
    category: "Accessories",
    brand: "ToolPro",
    price: 2999,
    originalPrice: 4499,
    rating: 4.5,
    reviews: 189,
    inStock: true,
    image: "/products/product3.jpg",
  },
  {
    id: 4,
    name: "Work Light 1000 Lumens",
    category: "Lighting",
    brand: "BrightMax",
    price: 3499,
    originalPrice: null,
    rating: 4.7,
    reviews: 423,
    inStock: true,
    image: "/products/product1.jpg",
    trending: true,
  },
  {
    id: 5,
    name: "Circular Saw 1500W",
    category: "Power Tools",
    brand: "CutMaster",
    price: 9999,
    originalPrice: 13999,
    rating: 4.9,
    reviews: 512,
    inStock: false,
    image: "/products/product2.jpg",
  },
  {
    id: 6,
    name: "Tool Storage Cabinet",
    category: "Storage",
    brand: "OrganizePro",
    price: 15999,
    originalPrice: null,
    rating: 4.4,
    reviews: 156,
    inStock: true,
    image: "/products/product3.jpg",
  },
  {
    id: 7,
    name: "Safety Goggles Set",
    category: "Safety",
    brand: "SafetyFirst",
    price: 899,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 678,
    inStock: true,
    image: "/products/product1.jpg",
  },
  {
    id: 8,
    name: "Measuring Tape 25ft",
    category: "Hand Tools",
    brand: "MeasurePro",
    price: 599,
    originalPrice: null,
    rating: 4.6,
    reviews: 892,
    inStock: true,
    image: "/products/product2.jpg",
  },
  {
    id: 9,
    name: "Hammer Drill 800W",
    category: "Power Tools",
    brand: "ProMaster",
    price: 6499,
    originalPrice: 8999,
    rating: 4.7,
    reviews: 334,
    inStock: true,
    image: "/products/product3.jpg",
    trending: true,
  },
  {
    id: 10,
    name: "Socket Wrench Set",
    category: "Hand Tools",
    brand: "ToolPro",
    price: 3999,
    originalPrice: 5499,
    rating: 4.8,
    reviews: 445,
    inStock: true,
    image: "/products/product1.jpg",
  },
  {
    id: 11,
    name: "Extension Cord 50ft",
    category: "Accessories",
    brand: "PowerLink",
    price: 1299,
    originalPrice: null,
    rating: 4.5,
    reviews: 267,
    inStock: true,
    image: "/products/product2.jpg",
  },
  {
    id: 12,
    name: "Work Gloves Premium",
    category: "Safety",
    brand: "SafetyFirst",
    price: 699,
    originalPrice: 999,
    rating: 4.4,
    reviews: 534,
    inStock: true,
    image: "/products/product3.jpg",
  },
];

const categories = [
  { name: "All Products", count: 12 },
  { name: "Power Tools", count: 4 },
  { name: "Hand Tools", count: 2 },
  { name: "Accessories", count: 2 },
  { name: "Safety", count: 2 },
  { name: "Storage", count: 1 },
  { name: "Lighting", count: 1 },
];

const brands = [
  "All Brands",
  "ProMaster",
  "ToolPro",
  "BrightMax",
  "CutMaster",
  "OrganizePro",
  "SafetyFirst",
  "MeasurePro",
  "PowerLink",
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: Infinity },
];

export default function ProductsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  const colors = {
    light: {
      bg: "#FFFFFF",
      card: "#F8F9FA",
      text: "#1A1A1A",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      primary: "#F59E0B",
      success: "#10B981",
      error: "#EF4444",
    },
    dark: {
      bg: "#0A0A0A",
      card: "#1A1A1A",
      text: "#FFFFFF",
      textSecondary: "#9CA3AF",
      border: "#374151",
      primary: "#F59E0B",
      success: "#10B981",
      error: "#EF4444",
    },
  };

  const theme = darkMode ? colors.dark : colors.light;

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;
    const brandMatch =
      selectedBrand === "All Brands" || product.brand === selectedBrand;
    const priceMatch =
      product.price >= selectedPriceRange.min &&
      product.price <= selectedPriceRange.max;
    const searchMatch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && brandMatch && priceMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const toggleLike = (productId: number) => {
    const newLiked = new Set(likedProducts);
    newLiked.has(productId)
      ? newLiked.delete(productId)
      : newLiked.add(productId);
    setLikedProducts(newLiked);
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const discount = product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;
    const isLiked = likedProducts.has(product.id);

    return (
      <div
        className="border transition-all duration-300 hover:shadow-lg h-min group cursor-pointer "
        style={{ borderColor: theme.border, backgroundColor: theme.card }}
        // onClick={() => (window.location.href = `/products/${product.id}`)}
        onClick={() => (window.location.href = `/products/id`)}
      >
        {/* Image Container */}
        <div
          className={`relative aspect-square w-full ${
            viewMode !== "grid" && "max-h-[300px]"
          } overflow-hidden`}
          style={{ backgroundColor: theme.bg }}
        >
          {product?.image ? (
            <Image
              src={product.image}
              alt="product-image"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package
                size={80}
                style={{ color: theme.border, opacity: 0.3 }}
              />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <div
                className="px-2 py-1 text-xs font-bold tracking-wider uppercase"
                style={{ backgroundColor: theme.error, color: "#FFFFFF" }}
              >
                Out of Stock
              </div>
            )}
            {discount > 0 && (
              <div
                className="px-2 py-1 text-xs font-bold tracking-wider uppercase"
                style={{ backgroundColor: theme.primary, color: "#000000" }}
              >
                -{discount}%
              </div>
            )}
            {product.trending && (
              <div
                className="px-2 py-1 text-xs font-bold tracking-wider uppercase flex items-center gap-1"
                style={{ backgroundColor: theme.success, color: "#FFFFFF" }}
              >
                <TrendingUp size={12} />
                Trending
              </div>
            )}
          </div>

          {/* Like Button */}
          <button
            className="absolute top-3 right-3 p-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: isLiked ? theme.primary : theme.card,
              border: `1px solid ${theme.border}`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(product.id);
            }}
          >
            <Heart
              size={16}
              fill={isLiked ? "#000000" : "none"}
              style={{ color: isLiked ? "#000000" : theme.textSecondary }}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category & Brand */}
          <div className="flex items-center gap-2 text-xs">
            <span
              style={{ color: theme.primary }}
              className="font-bold uppercase tracking-wider"
            >
              {product.category}
            </span>
            <span style={{ color: theme.border }}>|</span>
            <span
              style={{ color: theme.textSecondary }}
              className="uppercase tracking-wider"
            >
              {product.brand}
            </span>
          </div>

          {/* Product Name */}
          <h3
            className="font-bold text-sm line-clamp-2 group-hover:text-opacity-80 transition-all"
            style={{ color: theme.text }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(product.rating) ? theme.primary : "none"}
                  style={{ color: theme.primary }}
                />
              ))}
            </div>
            <span className="text-xs font-medium" style={{ color: theme.text }}>
              {product.rating}
            </span>
            <span className="text-xs" style={{ color: theme.textSecondary }}>
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold" style={{ color: theme.text }}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span
                className="text-sm line-through"
                style={{ color: theme.textSecondary }}
              >
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full py-2.5 font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: product.inStock ? theme.primary : theme.border,
              color: "#000000",
            }}
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic
            }}
          >
            {product.inStock ? (
              <>
                <ShoppingCart size={14} className="inline mr-1" />
                Add to Cart
              </>
            ) : (
              "Out of Stock"
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen pt-14"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Header */}
      <div className="border-b" style={{ borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: theme.text }}
              >
                All Products
              </h1>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                {sortedProducts.length} products found
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div
                className="flex border rounded"
                style={{ borderColor: theme.border }}
              >
                <button
                  className="p-2 transition-all"
                  style={{
                    backgroundColor:
                      viewMode === "grid" ? theme.primary : "transparent",
                    color: viewMode === "grid" ? "#000000" : theme.text,
                  }}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  className="p-2 transition-all"
                  style={{
                    backgroundColor:
                      viewMode === "list" ? theme.primary : "transparent",
                    color: viewMode === "list" ? "#000000" : theme.text,
                  }}
                  onClick={() => setViewMode("list")}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button
                className="p-2 border rounded transition-all hover:opacity-80"
                style={{ borderColor: theme.border, color: theme.text }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile Filter Button */}
              <button
                className="sm:hidden p-2 border rounded"
                style={{ borderColor: theme.border, color: theme.text }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden"
            } lg:block`}
          >
            <div className="sticky top-8 space-y-6">
              {/* Mobile Filter Header */}
              <div className="flex lg:hidden items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: theme.text }}>
                  Filters
                </h2>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} style={{ color: theme.text }} />
                </button>
              </div>

              {/* Search */}
              <div>
                <label
                  className="text-xs font-bold tracking-wider uppercase mb-2 block"
                  style={{ color: theme.textSecondary }}
                >
                  Search
                </label>
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: theme.textSecondary }}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded outline-none transition-colors"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.card,
                      color: theme.text,
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label
                  className="text-xs font-bold tracking-wider uppercase mb-3 block"
                  style={{ color: theme.textSecondary }}
                >
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full text-left px-3 py-2 rounded transition-all text-sm"
                      style={{
                        backgroundColor:
                          selectedCategory === category.name
                            ? theme.primary
                            : "transparent",
                        color:
                          selectedCategory === category.name
                            ? "#000000"
                            : theme.text,
                      }}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span
                          className="text-xs"
                          style={{
                            color:
                              selectedCategory === category.name
                                ? "#000000"
                                : theme.textSecondary,
                          }}
                        >
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <label
                  className="text-xs font-bold tracking-wider uppercase mb-3 block"
                  style={{ color: theme.textSecondary }}
                >
                  Brands
                </label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      className="w-full text-left px-3 py-2 rounded transition-all text-sm"
                      style={{
                        backgroundColor:
                          selectedBrand === brand
                            ? theme.primary
                            : "transparent",
                        color: selectedBrand === brand ? "#000000" : theme.text,
                      }}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label
                  className="text-xs font-bold tracking-wider uppercase mb-3 block"
                  style={{ color: theme.textSecondary }}
                >
                  Price Range
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      className="w-full text-left px-3 py-2 rounded transition-all text-sm"
                      style={{
                        backgroundColor:
                          selectedPriceRange.label === range.label
                            ? theme.primary
                            : "transparent",
                        color:
                          selectedPriceRange.label === range.label
                            ? "#000000"
                            : theme.text,
                      }}
                      onClick={() => setSelectedPriceRange(range)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                className="w-full py-2 border rounded font-bold text-sm tracking-wider uppercase transition-all hover:opacity-80"
                style={{ borderColor: theme.border, color: theme.text }}
                onClick={() => {
                  setSelectedCategory("All Products");
                  setSelectedBrand("All Brands");
                  setSelectedPriceRange(priceRanges[0]);
                  setSearchQuery("");
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Filter Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded text-sm"
                style={{ borderColor: theme.border, color: theme.text }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              <div className="flex items-center gap-2">
                <label
                  className="text-sm font-medium"
                  style={{ color: theme.textSecondary }}
                >
                  Sort by:
                </label>
                <select
                  className="px-4 py-2 border rounded outline-none text-sm"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.card,
                    color: theme.text,
                  }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package
                  size={80}
                  className="mx-auto mb-4"
                  style={{ color: theme.border, opacity: 0.3 }}
                />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: theme.text }}
                >
                  No products found
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: theme.textSecondary }}
                >
                  Try adjusting your filters or search query
                </p>
                <button
                  className="px-6 py-2 font-bold text-sm tracking-wider uppercase transition-all hover:opacity-90"
                  style={{ backgroundColor: theme.primary, color: "#000000" }}
                  onClick={() => {
                    setSelectedCategory("All Products");
                    setSelectedBrand("All Brands");
                    setSelectedPriceRange(priceRanges[0]);
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
