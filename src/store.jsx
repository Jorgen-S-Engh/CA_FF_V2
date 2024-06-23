import { create } from "zustand";

// const useStore = create((set) => ({
//   count: 0,
//   increase: () => set((state) => ({ count: state.count + 1 })),
//   decrease: () =>
//     set((state) => (state.count > 0 ? { count: state.count - 1 } : state)),
//   increaseBy: (value) => set((state) => ({ count: state.count + value })),
//   remove: () => set({ count: 0 }),
// }));

const useCart = create((set) => ({
  cart: [],
  addToCart: (product) => (set) => ({ cart: [...state, product] }),
  clearCart: () => set({ cart: [] }),
}));

export default useCart;
