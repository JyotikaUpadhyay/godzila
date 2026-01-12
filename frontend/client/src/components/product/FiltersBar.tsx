"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FiltersBar() {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") || "";
  const sort = sp.get("sort") || "newest";

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);

    // reset to page 1 when filters change
    params.delete("page");

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setParam("q", e.target.value)}
          placeholder="Search products..."
          className="w-full md:w-[280px] rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-black"
        />

        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-black"
        >
          <option value="newest">Sort: New</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
        </select>

        <button
          onClick={() => {
            const params = new URLSearchParams(sp.toString());
            params.delete("q");
            params.delete("sort");
            params.delete("page");
            router.push(`?${params.toString()}`);
          }}
          className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold hover:border-black"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
