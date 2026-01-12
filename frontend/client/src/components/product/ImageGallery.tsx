"use client";

import { useState } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const safe = images?.length ? images : ["/images/placeholder.jpg"];
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-100">
        <img
          src={safe[active]}
          alt="Product image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto">
        {safe.map((src, idx) => (
          <button
            key={src + idx}
            onClick={() => setActive(idx)}
            className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border ${
              idx === active ? "border-black" : "border-zinc-200"
            }`}
          >
            <img src={src} alt="thumb" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
