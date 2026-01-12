"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  current = 1,
}: {
  current?: number;
}) {
  const router = useRouter();
  const sp = useSearchParams();

  function go(next: number) {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(next));
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => go(Math.max(1, current - 1))}
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold hover:border-black"
      >
        Prev
      </button>

      {[1, 2, 3].map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={`rounded-full px-4 py-2 text-sm font-semibold border ${
            p === current ? "border-black bg-black text-white" : "border-zinc-300 hover:border-black"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => go(current + 1)}
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold hover:border-black"
      >
        Next
      </button>
    </div>
  );
}
