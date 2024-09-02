import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const cartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      clearCart: () =>
        set(() => ({
          cartItems: [],
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
              : item
          ),
        })),

      totalCost: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      cartItemCount: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
