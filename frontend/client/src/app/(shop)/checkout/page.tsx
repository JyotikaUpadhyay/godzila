"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/store/cart.store";
import { apiPost } from "@/lib/api";
import { EP } from "@/lib/endpoints";
import { auth } from "@/lib/auth";
import { usd } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const shipping = subtotal >= 15000 ? 0 : items.length ? 499 : 0;
  const total = subtotal + shipping;

  async function placeOrder() {
    setMsg("");
    setLoading(true);
    try {
      const token = auth.get();
      if (!token) throw new Error("Please login first to place an order.");
      if (!items.length) throw new Error("Your cart is empty.");

      const data = await apiPost<any>(EP.orders, { items, shippingAddress: form }, token);
      clear();
      setMsg(`✅ Order placed: ${data.order?._id}`);
    } catch (e: any) {
      setMsg(e.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-black tracking-tight">Checkout</h1>
        <Link href="/cart" className="text-sm font-semibold text-zinc-700 hover:text-black">
          ← Back to cart
        </Link>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-xs font-bold tracking-widest text-zinc-700">SHIPPING ADDRESS</p>

          <div className="mt-4 grid gap-3">
            {Object.entries(form).map(([k, v]) => (
              <input
                key={k}
                value={v}
                onChange={(e) => setForm((s) => ({ ...s, [k]: e.target.value }))}
                placeholder={k}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-black"
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 h-fit">
          <p className="text-xs font-bold tracking-widest text-zinc-700">ORDER SUMMARY</p>

          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{usd(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">{shipping ? usd(shipping) : "Free"}</span>
            </div>
            <div className="mt-3 flex justify-between border-t pt-3">
              <span className="font-semibold">Total</span>
              <span className="font-black">{usd(total)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="mt-5 w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Placing order…" : "Place Order"}
          </button>

          {msg ? (
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800">
              {msg}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
