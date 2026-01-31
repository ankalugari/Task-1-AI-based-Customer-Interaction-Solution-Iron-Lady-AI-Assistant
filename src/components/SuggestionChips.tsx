interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-700 text-sm font-medium transition-all duration-200 hover:shadow-md hover:scale-105 border border-orange-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
