"use client";

import Link from "next/link";
import { useCart } from "@/store/cart.store";
import TopBar from "./TopBar";
import MegaMenu from "./MegaMenu";
import { Search, User, ShoppingBag } from "lucide-react";

export default function Header() {
  const cartCount = useCart((s) => s.items.reduce((sum, it) => sum + it.qty, 0));

  return (
    <header className="sticky top-0 z-40 bg-white">
      <TopBar />

      <div className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="BLUEFLY" className="h-8" />
          </Link>

          {/* Search */}
          <div className="hidden md:block w-[420px]">
            <div className="flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 focus-within:border-black">
              <Search size={18} className="text-zinc-500" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Search designers, brands, products..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              className="flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-black"
              href="/login"
            >
              <User size={18} />
              <span className="hidden sm:inline">Log in</span>
            </Link>

            <Link
              className="relative flex items-center gap-2 text-sm font-semibold text-zinc-800 hover:text-black"
              href="/cart"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Cart</span>

              <span className="absolute -right-2 -top-2 rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Mega Menu Nav */}
      <nav className="border-b">
        <div className="mx-auto max-w-6xl px-4">
          <MegaMenu />
        </div>
      </nav>
    </header>
  );
}
