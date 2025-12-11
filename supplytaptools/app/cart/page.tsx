"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Package,
  Moon,
  Sun,
  Star,
  ShoppingBag,
  X,
} from "lucide-react";
import Image from "next/image";

/* -------------------------
    🔹 TYPES (IMPORTANT!)
--------------------------*/
interface BaseItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  inStock: boolean;
  category: string;
  image: string;
  rating: number;
}

interface CartItem extends BaseItem {
  quantity: number;
}

interface WishlistItem extends BaseItem {}

/* -------------------------
    🔹 THEME COLORS
--------------------------*/
const colors = {
  primary: "#ebdb00ff",
  secondary: "#ebdb00ff",
  black: "#0a0a0a",
  slate: "#1a1a1a",
  dark: "#0f0f0f",
  gray: "#404040",
  lightGray: "#a0a0a0",
  white: "#ffffff",
  light: "#d4d4d4",
  success: "#10b981",
  accent: "#06b6d4",
  darker: "#020617",
  danger: "#DC3545",
  warning: "#FFC107",
};

/* -------------------------
    🔹 INITIAL DATA
--------------------------*/
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Professional Cordless Drill Set",
    price: 8999,
    originalPrice: 12999,
    quantity: 1,
    inStock: true,
    category: "Power Tools",
    image: "/products/product1.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Impact Driver Set",
    price: 7499,
    originalPrice: 9999,
    quantity: 2,
    inStock: true,
    category: "Power Tools",
    image: "/products/product2.jpg",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Drill Bit Set (100pc)",
    price: 2999,
    originalPrice: null,
    quantity: 1,
    inStock: true,
    category: "Accessories",
    image: "/products/product3.jpg",
    rating: 4.5,
  },
];

const initialWishlistItems: WishlistItem[] = [
  {
    id: 4,
    name: "Work Light 1000 Lumens",
    price: 3499,
    originalPrice: 4999,
    inStock: true,
    category: "Lighting",
    image: "/products/product1.jpg",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Electric Sander Pro",
    price: 6499,
    originalPrice: 8999,
    inStock: true,
    category: "Power Tools",
    image: "/products/product2.jpg",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Tool Storage Cabinet",
    price: 15999,
    originalPrice: null,
    inStock: false,
    category: "Storage",
    image: "/products/product3.jpg",
    rating: 4.4,
  },
];

/* -------------------------
    🔹 MAIN COMPONENT
--------------------------*/
export default function CartWishlistApp() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<"cart" | "wishlist">("cart");
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(initialWishlistItems);

  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  /* -------------------------
      🔹 THEME OBJECT
  --------------------------*/
  const theme = {
    bg: darkMode ? colors.black : colors.white,
    cardBg: darkMode ? colors.slate : "#f9fafb",
    text: darkMode ? colors.white : colors.black,
    textSecondary: darkMode ? colors.lightGray : colors.gray,
    border: darkMode ? colors.gray : "#e5e7eb",
    hover: darkMode ? colors.dark : "#f3f4f6",
  };

  /* -------------------------
      🔹 CART HANDLERS
  --------------------------*/
  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToWishlist = (item: CartItem) => {
    removeFromCart(item.id);
    if (!wishlistItems.some((w) => w.id === item.id)) {
      const { quantity, ...rest } = item;
      setWishlistItems((prev) => [...prev, rest]);
    }
  };

  /* -------------------------
      🔹 PROMO HANDLER
  --------------------------*/
  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    if (code === "SAVE10") setAppliedPromo({ code, discount: 10 });
    else if (code === "HARDWARE20") setAppliedPromo({ code, discount: 20 });
    else alert("Invalid promo code");
  };

  /* -------------------------
      🔹 TOTAL CALCULATIONS
  --------------------------*/
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;

  const shipping = subtotal > 10000 ? 0 : 199;

  const total = subtotal - discount + shipping;

  const savings = cartItems.reduce((sum, item) => {
    const original = item.originalPrice ?? item.price;
    return sum + (original - item.price) * item.quantity;
  }, 0);

  /* -------------------------
      🔹 UI STARTS HERE
  --------------------------*/
  return (
    <div
      className="min-h-screen transition-colors duration-300 pt-14"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <div className="mb-6">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: theme.text }}
            >
              Shopping Cart
            </h2>
            <p style={{ color: theme.textSecondary }}>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag
                size={64}
                className="mx-auto mb-4"
                style={{ color: theme.border }}
              />
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: theme.text }}
              >
                Your cart is empty
              </h3>
              <p className="mb-6" style={{ color: theme.textSecondary }}>
                Add items to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border p-4 transition-all"
                    style={{
                      backgroundColor: theme.cardBg,
                      borderColor: theme.border,
                    }}
                  >
                    <div className="flex gap-4">
                      <div
                        className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: theme.hover }}
                      >
                        {item?.image ? (
                          <Image
                            src={item.image}
                            alt="product-image"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <Package
                              size={40}
                              style={{ color: theme.border }}
                            />
                          </>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-4 mb-2">
                          <div>
                            <h3
                              className="font-bold mb-1"
                              style={{ color: theme.text }}
                            >
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="text-xs px-2 py-1 rounded"
                                style={{
                                  backgroundColor: darkMode
                                    ? colors.dark
                                    : "#f3f4f6",
                                  color: theme.textSecondary,
                                }}
                              >
                                {item.category}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star
                                  size={14}
                                  fill={colors.secondary}
                                  style={{ color: colors.secondary }}
                                />
                                <span
                                  className="text-xs"
                                  style={{ color: theme.textSecondary }}
                                >
                                  {item.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 rounded-lg hover:bg-opacity-10 transition-colors h-fit"
                            style={{ color: colors.danger }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-4">
                          <div>
                            <div className="flex items-baseline gap-2 mb-2">
                              <span
                                className="text-lg font-bold"
                                style={{ color: theme.text }}
                              >
                                ₹{item.price.toLocaleString("en-IN")}
                              </span>
                              {item.originalPrice && (
                                <>
                                  <span
                                    className="text-sm line-through"
                                    style={{ color: theme.textSecondary }}
                                  >
                                    ₹
                                    {item.originalPrice.toLocaleString("en-IN")}
                                  </span>
                                  <span
                                    className="text-xs font-bold px-2 py-1 rounded"
                                    style={{
                                      backgroundColor: colors.success,
                                      color: colors.white,
                                    }}
                                  >
                                    {Math.round(
                                      ((item.originalPrice - item.price) /
                                        item.originalPrice) *
                                        100
                                    )}
                                    % OFF
                                  </span>
                                </>
                              )}
                            </div>

                            <div
                              className="flex items-center border rounded-lg w-fit"
                              style={{ borderColor: theme.border }}
                            >
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-opacity-10 transition-colors"
                                style={{ color: theme.text }}
                              >
                                <Minus size={16} />
                              </button>
                              <span
                                className="px-4 font-bold"
                                style={{ color: theme.text }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-opacity-10 transition-colors"
                                style={{ color: theme.text }}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => moveToWishlist(item)}
                            className="text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors"
                            style={{
                              borderColor: theme.border,
                              color: theme.text,
                            }}
                          >
                            <Heart size={16} />
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div
                  className="rounded-lg border p-6 sticky top-24"
                  style={{
                    backgroundColor: theme.cardBg,
                    borderColor: theme.border,
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-6"
                    style={{ color: theme.text }}
                  >
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span style={{ color: theme.textSecondary }}>
                        Subtotal
                      </span>
                      <span className="font-bold" style={{ color: theme.text }}>
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between">
                        <span style={{ color: colors.success }}>Savings</span>
                        <span
                          className="font-bold"
                          style={{ color: colors.success }}
                        >
                          -₹{savings.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    {appliedPromo && (
                      <div className="flex justify-between items-center">
                        <span style={{ color: colors.success }}>
                          Promo ({appliedPromo.code})
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-bold"
                            style={{ color: colors.success }}
                          >
                            -₹{discount.toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={() => setAppliedPromo(null)}
                            className="p-1"
                            style={{ color: colors.danger }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span style={{ color: theme.textSecondary }}>
                        Shipping
                      </span>
                      <span
                        className="font-bold"
                        style={{
                          color: shipping === 0 ? colors.success : theme.text,
                        }}
                      >
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p
                        className="text-xs"
                        style={{ color: theme.textSecondary }}
                      >
                        Add ₹{(10000 - subtotal).toLocaleString("en-IN")} more
                        for free shipping
                      </p>
                    )}
                  </div>

                  <div
                    className="border-t pt-4 mb-6"
                    style={{ borderColor: theme.border }}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className="text-lg font-bold"
                        style={{ color: theme.text }}
                      >
                        Total
                      </span>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: theme.text }}
                      >
                        ₹{total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {!appliedPromo && (
                    <div className="mb-4">
                      <label
                        className="text-sm font-medium mb-2 block"
                        style={{ color: theme.text }}
                      >
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 rounded-lg border outline-none transition-colors"
                          style={{
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                          }}
                        />
                        <button
                          onClick={applyPromoCode}
                          className="px-4 py-2 rounded-lg font-medium transition-colors"
                          style={{
                            backgroundColor: colors.primary,
                            color: colors.black,
                          }}
                        >
                          Apply
                        </button>
                      </div>
                      <p
                        className="text-xs mt-2"
                        style={{ color: theme.textSecondary }}
                      >
                        Try: SAVE10 or HARDWARE20
                      </p>
                    </div>
                  )}

                  <button
                    className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.black,
                    }}
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>

                  <p
                    className="text-xs text-center mt-4"
                    style={{ color: theme.textSecondary }}
                  >
                    Secure checkout • Free returns
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
