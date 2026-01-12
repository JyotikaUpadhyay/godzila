export default function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${props.className ?? ""}`}
    />
  );
}
