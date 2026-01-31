import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-4">
      <div className="flex gap-3 items-center max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={disabled}
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
