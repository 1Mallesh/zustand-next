import { create } from "zustand";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = Product & { qty: number };

type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  totalItems: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);

      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return { cart: [...state.cart, { ...product, qty: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  totalItems: () => get().cart.reduce((sum, item) => sum + item.qty, 0),
}));
