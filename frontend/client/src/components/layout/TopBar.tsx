export default function TopBar() {
  return (
    <div className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-[11px] tracking-wide text-zinc-700">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Designer deals</span>
          <span className="text-zinc-400">•</span>
          <span>New arrivals</span>
          <span className="text-zinc-400">•</span>
          <span>Clearance</span>
        </div>
        <span>Free shipping on select orders (demo)</span>
      </div>
    </div>
  );
}
