import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Big hero image */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-black md:col-span-2">
          <img
            src="/images/hero-1.jpg"
            alt="Designer Deals"
            className="absolute inset-0 h-full w-full object-cover opacity-85"
          />
          <div className="relative min-h-[340px] p-8 md:min-h-[440px]">
            <p className="text-[11px] font-bold tracking-widest text-white/80">
              DESIGNER DEALS
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
              Luxury styles, <span className="text-white/80">big savings</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/85">
              Bluefly-inspired store UI • premium product grid • cart + checkout
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/collections/women"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                Shop Women
              </Link>
              <Link
                href="/collections/clearance"
                className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Clearance
              </Link>
            </div>
          </div>
        </div>

        {/* Right promo tiles */}
        <div className="grid gap-4">
          <Link
            href="/collections/under-50"
            className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white"
          >
            <img
              src="/images/hero-2.jpg"
              alt="Under $50"
              className="h-[210px] w-full object-cover"
            />
            <div className="p-5">
              <p className="text-[11px] font-bold tracking-widest text-zinc-700">
                UNDER $50
              </p>
              <p className="mt-1 text-xl font-black">Small steals</p>
              <p className="mt-2 text-sm text-zinc-600">
                Budget finds you’ll love.
              </p>
            </div>
          </Link>

          <Link
            href="/collections/designers"
            className="rounded-2xl border border-zinc-200 bg-white p-6 hover:bg-zinc-50"
          >
            <p className="text-[11px] font-bold tracking-widest text-zinc-700">
              DESIGNERS
            </p>
            <p className="mt-2 text-xl font-black">Top brands</p>
            <p className="mt-2 text-sm text-zinc-600">
              Browse designer favorites.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {["GUCCI", "COACH", "PRADA"].map((b) => (
                <div
                  key={b}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-center text-xs font-semibold text-zinc-800"
                >
                  {b}
                </div>
              ))}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
