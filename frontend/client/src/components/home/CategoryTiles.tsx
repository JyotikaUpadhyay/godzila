import Link from "next/link";

const tiles = [
  {
    title: "Women",
    subtitle: "Dresses • Bags • Shoes",
    href: "/collections/women",
    img: "/images/hero-1.jpg",
  },
  {
    title: "Men",
    subtitle: "Sneakers • Jackets • Essentials",
    href: "/collections/men",
    img: "/images/hero-2.jpg",
  },
  {
    title: "Accessories",
    subtitle: "Sunglasses • Watches • Jewelry",
    href: "/collections/accessories",
    img: "/images/placeholder.jpg",
  },
];

export default function CategoryTiles() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-black tracking-tight">Shop Categories</h2>
        <Link href="/collections/clearance" className="text-sm font-semibold text-zinc-700 hover:text-black">
          View clearance →
        </Link>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-black"
          >
            <img
              src={t.img}
              alt={t.title}
              className="h-[220px] w-full object-cover opacity-85 transition group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 p-6">
              <p className="text-[11px] font-bold tracking-widest text-white/80">SHOP</p>
              <p className="mt-2 text-2xl font-black text-white">{t.title}</p>
              <p className="mt-1 text-sm text-white/80">{t.subtitle}</p>
              <span className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-black">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
