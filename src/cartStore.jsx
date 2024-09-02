import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the store for the cart with persistence
export const cartStore = create(
  persist(
    (set, get) => ({
      cartItems: [], // Initial state for cart items

      // Function to add an item to the cart
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);

          if (existingItem) {
            // If the item already exists, increase its quantity
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            // If the item doesn't exist, add it with a quantity of 1
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        }),

      // Function to remove an item from the cart
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      // Function to increase the quantity of an item
      increaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      // Function to decrease the quantity of an item
      decreaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
              : item
          ),
        })),

      // Computed property to calculate the total number of items in the cart
      cartItemCount: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: "cart-storage", // Unique name for the session storage key
      getStorage: () => sessionStorage, // Use sessionStorage instead of localStorage
    }
  )
);
