"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { apiGet } from "@/lib/api";
import { EP } from "@/lib/endpoints";
import ProductGrid from "./ProductGrid";

export default function RelatedProducts({
  collectionSlug,
  excludeId,
}: {
  collectionSlug: string;
  excludeId: string;
}) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const url = useMemo(() => {
    return `${EP.products}?collectionSlug=${collectionSlug}`;
  }, [collectionSlug]);

  useEffect(() => {
    setLoading(true);
    apiGet<{ success: boolean; items: Product[] }>(url)
      .then((d) => {
        // remove current item + limit
        const filtered = d.items.filter((x) => x._id !== excludeId).slice(0, 8);
        setItems(filtered);
      })
      .finally(() => setLoading(false));
  }, [url, excludeId]);

  if (loading) {
    return (
      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
        Loading recommendations…
      </div>
    );
  }

  if (!items.length) return null;

  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-lg font-black tracking-tight">You may also like</h2>
        <p className="text-sm text-zinc-600">More from this collection</p>
      </div>

      <div className="mt-5">
        <ProductGrid items={items} />
      </div>
    </section>
  );
}
