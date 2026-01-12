"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ImageGallery from "@/components/product/ImageGallery";
import QuantityPicker from "@/components/product/QuantityPicker";
import RelatedProducts from "@/components/product/RelatedProducts";

import { apiGet } from "@/lib/api";
import type { Product } from "@/types/product";
import { usd } from "@/lib/utils";
import { useCart } from "@/store/cart.store";

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [product, setProduct] = useState<Product | null>(null);

  // ✅ cart + qty
  const addToCart = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const data = await apiGet<{ item: Product }>(`/products/${id}`);
      setProduct(data.item);
    }
    load();
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Loading product…
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* ===== MAIN PRODUCT GRID ===== */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* LEFT: Images */}
        <ImageGallery images={product.images || []} />

        {/* RIGHT: Details */}
        <div className="sticky top-[120px] space-y-6">
          <p className="text-xs font-bold tracking-widest text-zinc-500">
            {product.brand}
          </p>

          <h1 className="text-2xl font-semibold">{product.title}</h1>

          <div className="flex items-center gap-3">
            <span className="text-xl font-black">{usd(product.price)}</span>
            {product.compareAt ? (
              <span className="text-sm text-zinc-500 line-through">
                {usd(product.compareAt)}
              </span>
            ) : null}
          </div>

          <p className="text-sm text-zinc-600">{product.description}</p>

          {/* ✅ controlled qty */}
          <QuantityPicker qty={qty} setQty={setQty} />

          {/* ✅ add to cart works with your CartItem type */}
          <button
            onClick={() =>
              addToCart({
                productId: product._id,
                title: product.title,
                price: product.price,
                qty,
                image: product.images?.[0] || "/images/placeholder.jpg",
              })
            }
            className="w-full rounded-full bg-black py-4 text-sm font-bold text-white hover:opacity-90"
          >
            ADD TO CART
          </button>

          <p className="text-xs text-zinc-500">Free shipping & free returns (demo)</p>
        </div>
      </div>

      {/* ===== RELATED PRODUCTS ===== */}
      <div className="mt-20">
        <RelatedProducts
          collectionSlug={product.collectionSlug}
          excludeId={product._id}
        />
      </div>
    </div>
  );
}
