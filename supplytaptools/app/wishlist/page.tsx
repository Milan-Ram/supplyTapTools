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
  const [activeView, setActiveView] = useState<"cart" | "wishlist">("wishlist");
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
      🔹 WISHLIST HANDLERS
  --------------------------*/
  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (item: WishlistItem) => {
    removeFromWishlist(item.id);
    if (!cartItems.some((c) => c.id === item.id)) {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
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
              My Wishlist
            </h2>
            <p style={{ color: theme.textSecondary }}>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart
                size={64}
                className="mx-auto mb-4"
                style={{ color: theme.border }}
              />
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: theme.text }}
              >
                Your wishlist is empty
              </h3>
              <p className="mb-6" style={{ color: theme.textSecondary }}>
                Save items you love to buy later
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border overflow-hidden transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: theme.cardBg,
                    borderColor: theme.border,
                  }}
                >
                  <div className="relative">
                    <div
                      className="aspect-square flex items-center justify-center"
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
                          <Package size={40} style={{ color: theme.border }} />
                        </>
                      )}
                    </div>

                    {!item.inStock && (
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded text-xs font-bold"
                        style={{
                          backgroundColor: colors.danger,
                          color: colors.white,
                        }}
                      >
                        Out of Stock
                      </div>
                    )}

                    {item.originalPrice && (
                      <div
                        className="absolute top-4 right-4 px-3 py-1 rounded text-xs font-bold"
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
                      </div>
                    )}

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute bottom-4 right-4 p-2 rounded-full transition-all"
                      style={{
                        backgroundColor: darkMode ? colors.slate : colors.white,
                        color: colors.danger,
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: darkMode ? colors.dark : "#f3f4f6",
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

                    <h3
                      className="font-bold mb-3 line-clamp-2"
                      style={{ color: theme.text }}
                    >
                      {item.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span
                        className="text-xl font-bold"
                        style={{ color: theme.text }}
                      >
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      {item.originalPrice && (
                        <span
                          className="text-sm line-through"
                          style={{ color: theme.textSecondary }}
                        >
                          ₹{item.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => moveToCart(item)}
                      disabled={!item.inStock}
                      className="w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      style={{
                        backgroundColor: item.inStock
                          ? colors.primary
                          : theme.border,
                        color: colors.black,
                      }}
                    >
                      <ShoppingCart size={18} />
                      {item.inStock ? "Add to Cart" : "Unavailable"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
