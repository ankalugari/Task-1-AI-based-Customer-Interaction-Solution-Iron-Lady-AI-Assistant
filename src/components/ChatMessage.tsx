import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.sender === 'assistant';

  return (
    <div
      className={`flex gap-3 mb-6 ${
        isAssistant ? 'justify-start' : 'justify-end'
      } animate-fade-in`}
    >
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isAssistant
            ? 'bg-white shadow-sm border border-gray-100'
            : 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md'
        }`}
      >
        <p className={`text-sm leading-relaxed whitespace-pre-line ${
          isAssistant ? 'text-gray-800' : 'text-white'
        }`}>
          {message.content}
        </p>
        <span className={`text-xs mt-2 block ${
          isAssistant ? 'text-gray-400' : 'text-orange-100'
        }`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {!isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  );
}
