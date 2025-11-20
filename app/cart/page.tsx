"use client";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { cart, removeFromCart, addToCart } = useCartStore();

  return (
    <div className="max-w-[1400px] mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-5">Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">Qty: {item.qty}</p>
              <p className="font-bold text-blue-600">${item.price}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                -
              </button>
              <button
                onClick={() => addToCart(item)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                +
              </button>
            </div>
          </div>  
        ))}
      </div>
    </div>
  );
}
