"use client";

import { Product } from "@/store/cart-store";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div
      className="
        bg-white 
        shadow-[0px_0px_10px_rgba(0,0,0,0.1)] 
        rounded-[10px] 
        mt-8 
        relative 
        overflow-hidden 
        p-0 
        flex 
        flex-col
      "
    >
      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4 pb-16">
        <h3 className="font-semibold text-lg">{product.title}</h3>

        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
      </div>

      {/* Button fixed at bottom */}
      <button
        onClick={() => addToCart(product)}
        className="
          absolute bottom-0 left-0 w-full 
          bg-blue-600 text-white py-3 
          font-medium 
          hover:bg-blue-700 
          transition
        "
      >
        Add To Cart
      </button>
    </div>
  );
}
