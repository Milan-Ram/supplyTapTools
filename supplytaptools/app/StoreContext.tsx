"use client";
import React, { createContext, useContext, useState } from "react";

interface BaseItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  inStock: boolean;
  category: string;
  rating: number;
}

export interface CartItem extends BaseItem {
  quantity: number;
}

export interface WishlistItem extends BaseItem {}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Professional Cordless Drill Set",
    price: 8999,
    originalPrice: 12999,
    quantity: 1,
    inStock: true,
    category: "Power Tools",
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
    rating: 4.7,
  },
  {
    id: 5,
    name: "Electric Sander Pro",
    price: 6499,
    originalPrice: 8999,
    inStock: true,
    category: "Power Tools",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Tool Storage Cabinet",
    price: 15999,
    originalPrice: null,
    inStock: false,
    category: "Storage",
    rating: 4.4,
  },
];

const StoreContext = createContext<any>(null);

export const StoreProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(initialWishlistItems);

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
    const { quantity, ...rest } = item;
    if (!wishlistItems.some((w) => w.id === item.id)) {
      setWishlistItems((prev) => [...prev, rest]);
    }
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (item: WishlistItem) => {
    removeFromWishlist(item.id);
    if (!cartItems.some((c) => c.id === item.id)) {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        darkMode,
        setDarkMode,
        cartItems,
        wishlistItems,
        updateQuantity,
        removeFromCart,
        moveToWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
