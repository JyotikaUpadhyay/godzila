"use client";

import { create } from "zustand";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("bluefly_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function save(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("bluefly_cart", JSON.stringify(items));
}

export const useCart = create<CartState>((set, get) => ({
  items: load(),

  add: (item) => {
    const items = [...get().items];
    const idx = items.findIndex((x) => x.productId === item.productId);

    if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + item.qty };
    else items.push(item);

    save(items);
    set({ items });
  },

  remove: (id) => {
    const items = get().items.filter((x) => x.productId !== id);
    save(items);
    set({ items });
  },

  setQty: (id, qty) => {
    if (qty <= 0) return get().remove(id);
    const items = get().items.map((x) => (x.productId === id ? { ...x, qty } : x));
    save(items);
    set({ items });
  },

  clear: () => {
    save([]);
    set({ items: [] });
  },
}));
