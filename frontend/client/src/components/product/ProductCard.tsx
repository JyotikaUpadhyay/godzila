import Link from "next/link";
import type { Product } from "@/lib/types";
import { usd } from "@/lib/utils";

function percentOff(price: number, compareAt?: number | null) {
  if (!compareAt || compareAt <= price) return null;
  const pct = Math.round(((compareAt - price) / compareAt) * 100);
  return pct;
}

export default function ProductCard({ p }: { p: Product }) {
  const img = p.images?.[0] || "/images/placeholder.jpg";
  const off = percentOff(p.price, p.compareAt);

  return (
    <Link
      href={`/product/${p._id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:shadow-sm transition"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <img
          src={img}
          alt={p.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        {off ? (
          <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[11px] font-bold text-white">
            SALE {off}% OFF
          </div>
        ) : null}
      </div>

      <div className="p-4">
        <p className="text-[11px] font-bold tracking-widest text-zinc-600">{p.brand}</p>
        <p className="mt-2 line-clamp-2 text-sm font-semibold text-zinc-900 group-hover:text-black">
          {p.title}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-black">{usd(p.price)}</span>
          {p.compareAt ? (
            <span className="text-xs text-zinc-500 line-through">{usd(p.compareAt)}</span>
          ) : null}
        </div>

        <p className="mt-2 text-xs text-zinc-500">Free shipping (demo)</p>
      </div>
    </Link>
  );
}
