"use client";

import { useStore, WishlistItem } from "@/app/StoreContext";
import { Package, Heart, Trash2, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, moveToCart } = useStore();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={64} className="mx-auto mb-4 text-gray-500" />
          <h2 className="text-xl font-bold">Your wishlist is empty</h2>
        </div>
      ) : (
        wishlistItems.map((item: WishlistItem) => (
          <div key={item.id} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Package size={40} className="text-gray-400" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="font-bold">₹{item.price}</p>
                </div>
              </div>

              <button onClick={() => removeFromWishlist(item.id)}>
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>

            <button
              onClick={() => moveToCart(item)}
              className="mt-4 w-full bg-yellow-400 py-2 rounded-lg font-bold"
            >
              <ShoppingCart size={18} className="inline-block mr-2" />
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}
