"use client";

import { CartItem, useStore } from "@/app/StoreContext";
import { ShoppingBag, Package, Trash2, Plus, Minus, Heart } from "lucide-react";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, moveToWishlist } =
    useStore();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-500" />
          <h2 className="text-xl font-bold">Your cart is empty</h2>
        </div>
      ) : (
        cartItems.map((item: CartItem) => (
          <div key={item.id} className="border p-4 rounded-lg mb-4">
            <div className="flex gap-4">
              <Package size={40} className="text-gray-400" />

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>

                <p className="font-bold">₹{item.price}</p>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <Minus size={18} />
                  </button>

                  <span className="px-3">{item.quantity}</span>

                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={() => moveToWishlist(item)}
                  className="mt-3 text-blue-500 flex gap-2 items-center"
                >
                  <Heart size={16} /> Move to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
