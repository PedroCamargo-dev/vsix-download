export function SearchInput({
  value,
  onChange,
}: Readonly<{
  value: string;
  onChange: (value: string) => void;
}>) {
  return (
    <input
      type="text"
      id="searchExtension"
      className="w-full px-2 h-12 text-sm border rounded-xl text-center outline-none focus:border-blue-200 transition-all duration-300"
      placeholder="Pesquisar extensão"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
