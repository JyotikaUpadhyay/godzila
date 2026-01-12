"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import { EP } from "@/lib/endpoints";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function submit() {
    setMsg("");
    try {
      const data = await apiPost<any>(EP.authRegister, { name, email, password });
      auth.set(data.token);
      router.push("/orders");
    } catch (e: any) {
      setMsg(e.message || "Register failed");
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <p className="text-xs font-bold tracking-widest text-zinc-700">ACCOUNT</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight">Create account</h1>

        <div className="mt-6 grid gap-3">
          <input className="rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-black"
            placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-black"
            placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-black"
            placeholder="Password (min 6)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button onClick={submit} className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
            Register
          </button>

          {msg ? <p className="text-sm text-red-600">{msg}</p> : null}

          <p className="text-sm text-zinc-600">
            Already have an account? <Link className="font-semibold hover:text-black" href="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
