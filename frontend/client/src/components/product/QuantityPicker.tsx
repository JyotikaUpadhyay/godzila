"use client";

type Props = {
  qty: number;
  setQty: (qty: number) => void;
};

export default function QuantityPicker({ qty, setQty }: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="h-10 w-10 rounded-full border border-zinc-300 text-lg hover:border-black"
      >
        −
      </button>

      <div className="min-w-[40px] text-center text-sm font-semibold">{qty}</div>

      <button
        onClick={() => setQty(qty + 1)}
        className="h-10 w-10 rounded-full border border-zinc-300 text-lg hover:border-black"
      >
        +
      </button>
    </div>
  );
}
