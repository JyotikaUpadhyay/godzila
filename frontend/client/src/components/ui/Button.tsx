export default function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-semibold transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
