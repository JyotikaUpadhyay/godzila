"use client";

import Link from "next/link";
import { useCart } from "@/store/cart.store";
import { usd } from "@/lib/utils";

export default function CartPage() {
  const { items, remove, setQty, clear } = useCart();

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal >= 15000 ? 0 : items.length ? 499 : 0;
  const total = subtotal + shipping;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-black tracking-tight">Shopping Cart</h1>
        {items.length ? (
          <button onClick={clear} className="text-sm font-semibold text-zinc-700 hover:text-black">
            Clear cart
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8">
          <p className="text-sm text-zinc-700">Your cart is empty.</p>
          <Link href="/collections/women" className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.productId} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="flex gap-4">
                  <div className="h-24 w-24 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200">
                    <img src={it.image || "/images/placeholder.jpg"} alt={it.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">{it.title}</p>
                    <p className="mt-1 text-sm text-zinc-700">{usd(it.price)}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold hover:border-black" onClick={() => setQty(it.productId, it.qty - 1)}>−</button>
                        <span className="min-w-10 text-center text-sm font-semibold">{it.qty}</span>
                        <button className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold hover:border-black" onClick={() => setQty(it.productId, it.qty + 1)}>+</button>
                      </div>

                      <button className="text-sm font-semibold text-zinc-700 hover:text-black" onClick={() => remove(it.productId)}>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-black">{usd(it.price * it.qty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 h-fit">
            <p className="text-xs font-bold tracking-widest text-zinc-700">ORDER SUMMARY</p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-700">
                <span>Subtotal</span>
                <span className="font-semibold">{usd(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-700">
                <span>Shipping</span>
                <span className="font-semibold">{shipping ? usd(shipping) : "Free"}</span>
              </div>
              <div className="mt-3 flex justify-between border-t pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-black">{usd(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="mt-5 block w-full rounded-full bg-black px-6 py-3 text-center text-sm font-semibold text-white hover:opacity-90">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
