import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () =>
    set((state) => (state.count > 0 ? { count: state.count - 1 } : state)),
  remove: () => set({ count: 0 }),
}));

export default useStore;
