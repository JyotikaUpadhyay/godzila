"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import ProductCard from "@/components/product/ProductCard";
import FiltersBar from "@/components/product/FiltersBar";
import Pagination from "@/components/product/Pagination";

import { apiGet } from "@/lib/api";
import type { Product } from "@/lib/types";


export default function CollectionPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug as string;

  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const sort = searchParams.get("sort") || "newest";
  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // ✅ matches your backend style
        const data = await apiGet<{ success: boolean; items: Product[] }>(
          `/products?collectionSlug=${slug}&sort=${sort}&q=${q}&page=${page}`
        );

        setItems(data.items || []);
      } catch (err) {
        console.error("Failed to load collection", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug, sort, q, page]);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      {/* Title */}
      <div className="py-8">
        <h1 className="font-serif text-3xl font-bold uppercase tracking-wide">
          {slug.replace("-", " ")}
        </h1>
        <p className="mt-2 text-sm text-zinc-600">{items.length} items</p>
      </div>

      {/* ✅ Sticky Filters */}
      <div className="sticky top-[120px] z-30 bg-white/90 backdrop-blur border-b">
        <div className="py-3">
          <FiltersBar />
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <p className="py-20 text-center text-sm text-zinc-500">Loading products…</p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-zinc-500">No products found.</p>
      ) : (
        <>
          {/* ✅ IMPORTANT FIX: use p={product} */}
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product._id} p={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12">
            <Pagination current={page} />
          </div>
        </>
      )}
    </main>
  );
}
