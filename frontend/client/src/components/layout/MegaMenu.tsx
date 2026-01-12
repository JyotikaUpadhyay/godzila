"use client";

import Link from "next/link";
import { useState } from "react";

const MENU = [
  {
    label: "WOMEN",
    href: "/collections/women",
    cols: [
      { title: "Clothing", items: ["Dresses", "Tops", "Outerwear", "Denim"] },
      { title: "Shoes", items: ["Sneakers", "Heels", "Boots", "Sandals"] },
      { title: "Bags", items: ["Totes", "Crossbody", "Mini Bags", "Backpacks"] },
    ],
  },
  {
    label: "MEN",
    href: "/collections/men",
    cols: [
      { title: "Clothing", items: ["Jackets", "T-Shirts", "Pants", "Hoodies"] },
      { title: "Shoes", items: ["Sneakers", "Loafers", "Boots", "Slides"] },
      { title: "Accessories", items: ["Watches", "Sunglasses", "Belts", "Wallets"] },
    ],
  },
  {
    label: "DESIGNERS",
    href: "/collections/designers",
    cols: [
      { title: "Trending", items: ["GUCCI", "PRADA", "COACH", "TORY BURCH"] },
      { title: "Luxury", items: ["BURBERRY", "BALENCIAGA", "VERSACE", "FENDI"] },
      { title: "Sport", items: ["NIKE", "ADIDAS", "PUMA", "NEW BALANCE"] },
    ],
  },
];

export default function MegaMenu() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div
      className="relative"
      onMouseLeave={() => setOpen(null)}
    >
      <ul className="flex flex-wrap items-center gap-6 py-3 text-[12px] font-bold tracking-widest text-zinc-900">
        {MENU.map((m) => (
          <li key={m.label}
              onMouseEnter={() => setOpen(m.label)}
              className="relative"
          >
            <Link href={m.href} className="hover:text-black">
              {m.label}
            </Link>

            {/* dropdown */}
            {open === m.label ? (
              <div className="absolute left-0 top-full z-50 mt-3 w-[760px] rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-6">
                  {m.cols.map((c) => (
                    <div key={c.title}>
                      <p className="text-[11px] font-bold tracking-widest text-zinc-600">
                        {c.title.toUpperCase()}
                      </p>
                      <div className="mt-3 space-y-2">
                        {c.items.map((it) => (
                          <Link
                            key={it}
                            href={`${m.href}?q=${encodeURIComponent(it)}`}
                            className="block text-sm text-zinc-800 hover:text-black"
                          >
                            {it}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
                  <p className="text-sm text-zinc-700">
                    Extra 20% off on select items (demo)
                  </p>
                  <Link
                    href="/collections/clearance"
                    className="rounded-full bg-black px-4 py-2 text-xs font-bold tracking-widest text-white hover:opacity-90"
                  >
                    SHOP CLEARANCE
                  </Link>
                </div>
              </div>
            ) : null}
          </li>
        ))}

        <li>
          <Link
            href="/collections/clearance"
            className="rounded-full bg-black px-4 py-2 text-white hover:opacity-90"
          >
            CLEARANCE
          </Link>
        </li>
      </ul>
    </div>
  );
}
