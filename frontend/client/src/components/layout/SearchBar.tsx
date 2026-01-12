"use client";

export default function SearchBar({
  value,
  onChange,
  onEnter,
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
}) {
  return (
    <div className="hidden md:block w-[360px]">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        placeholder="Search designers, brands, products..."
        className="w-full rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm outline-none focus:border-black"
      />
    </div>
  );
}
