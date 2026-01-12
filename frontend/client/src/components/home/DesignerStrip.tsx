import Link from "next/link";

const designers = ["GUCCI", "COACH", "PRADA", "MICHAEL KORS", "RAY-BAN", "NIKE", "ADIDAS", "TORY BURCH"];

export default function DesignerStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-zinc-700">TRENDING DESIGNERS</p>
            <h3 className="mt-2 text-lg font-black tracking-tight">Shop top brands</h3>
          </div>
          <Link href="/collections/designers" className="text-sm font-semibold text-zinc-700 hover:text-black">
            Browse all →
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {designers.map((d) => (
            <Link
              key={d}
              href={`/collections/designers?q=${encodeURIComponent(d)}`}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold tracking-widest text-zinc-800 hover:border-black"
            >
              {d}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
