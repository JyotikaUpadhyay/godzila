import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-sm font-black tracking-tight">BLUEFLY</p>
            <p className="mt-3 text-sm text-zinc-600">
              Bluefly-style ecommerce demo (use your own assets/data).
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-zinc-800">HELP</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="#">Shipping</Link></li>
              <li><Link href="#">Returns</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-zinc-800">SHOP</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="/collections/women">Women</Link></li>
              <li><Link href="/collections/men">Men</Link></li>
              <li><Link href="/collections/clearance">Clearance</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-zinc-800">NEWSLETTER</p>
            <p className="mt-3 text-sm text-zinc-600">Deals, drops & clearance (demo).</p>
            <div className="mt-4 flex gap-2">
              <input className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-black" placeholder="Email" />
              <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} Bluefly-style clone (demo)
        </div>
      </div>
    </footer>
  );
}
