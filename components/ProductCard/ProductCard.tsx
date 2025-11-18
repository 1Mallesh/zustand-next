"use client";

import { Product, useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <img src={product.image} className="w-full h-40 object-cover rounded" />

      <h3 className="text-xl font-semibold mt-3">{product.title}</h3>
      <p className="text-gray-600 mb-3">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
