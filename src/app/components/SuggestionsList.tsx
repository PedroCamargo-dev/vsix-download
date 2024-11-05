export function SuggestionsList({
  suggestions,
  onSelect,
}: Readonly<{
  suggestions: { name: string; id: string }[];
  onSelect: (id: string) => void;
}>) {
  return (
    <div className="w-full border rounded-lg shadow-lg max-h-48 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <div
          key={`${suggestion.id}-${index}`}
          onClick={() => onSelect(suggestion.id)}
          className="cursor-pointer px-4 py-2 hover:bg-gray-200"
          aria-hidden="true"
        >
          {suggestion.name}
        </div>
      ))}
    </div>
  );
}
