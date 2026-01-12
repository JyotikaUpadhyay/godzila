"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { EP } from "@/lib/endpoints";
import { auth } from "@/lib/auth";
import type { Order } from "@/lib/types";
import { usd } from "@/lib/utils";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const token = auth.get();
        if (!token) {
          setMsg("Please login first to view orders.");
          return;
        }
        const data = await apiGet<{ success: boolean; orders: Order[] }>(EP.myOrders, token);
        setOrders(data.orders);
      } catch (e: any) {
        setMsg(e.message || "Failed to load orders");
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-black tracking-tight">My Orders</h1>
        <Link href="/collections/women" className="text-sm font-semibold text-zinc-700 hover:text-black">
          Continue shopping →
        </Link>
      </div>

      {msg ? (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700">{msg}</div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {orders.map((o) => (
          <div key={o._id} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-xs font-bold tracking-widest text-zinc-700">ORDER</p>
            <p className="mt-2 text-sm text-zinc-600">ID: <span className="font-semibold text-zinc-900">{o._id}</span></p>
            <p className="mt-2 text-sm text-zinc-600">Status: <span className="font-semibold text-zinc-900">{o.status}</span></p>
            <p className="mt-4 text-lg font-black">{usd(o.totals.grandTotal)}</p>
            <p className="mt-2 text-xs text-zinc-500">{new Date(o.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {!msg && orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700">
          No orders yet.
        </div>
      ) : null}
    </main>
  );
}
