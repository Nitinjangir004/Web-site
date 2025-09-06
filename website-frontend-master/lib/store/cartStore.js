'use client';

import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    } else {
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }
  }),
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(i => i.id !== itemId)
  })),
  updateItemQuantity: (itemId, quantity) => set((state) => ({
    items: state.items.map(i => 
      i.id === itemId ? { ...i, quantity } : i
    )
  })),
  clearCart: () => set({ items: [] })
})); 