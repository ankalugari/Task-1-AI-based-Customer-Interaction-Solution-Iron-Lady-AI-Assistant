import { useState, useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import { getAssistantResponse } from '../lib/assistant';
import { supabase } from '../lib/supabase';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import { Sparkles } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);

    try {
      await supabase.from('chat_sessions').insert({
        id: newSessionId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error creating session:', error);
    }

    const welcomeResponse = getAssistantResponse('', true);
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      content: welcomeResponse.message,
      sender: 'assistant',
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
    setSuggestions(welcomeResponse.suggestions || []);

    try {
      await supabase.from('chat_messages').insert({
        id: welcomeMessage.id,
        session_id: newSessionId,
        content: welcomeMessage.content,
        sender: welcomeMessage.sender,
        timestamp: welcomeMessage.timestamp.toISOString(),
      });
    } catch (error) {
      console.error('Error saving welcome message:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setSuggestions([]);

    try {
      await supabase.from('chat_messages').insert({
        id: userMessage.id,
        session_id: sessionId,
        content: userMessage.content,
        sender: userMessage.sender,
        timestamp: userMessage.timestamp.toISOString(),
      });
    } catch (error) {
      console.error('Error saving user message:', error);
    }

    setTimeout(async () => {
      const assistantResponse = getAssistantResponse(content, false);
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: assistantResponse.message,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSuggestions(assistantResponse.suggestions || []);

      try {
        await supabase.from('chat_messages').insert({
          id: assistantMessage.id,
          session_id: sessionId,
          content: assistantMessage.content,
          sender: assistantMessage.sender,
          timestamp: assistantMessage.timestamp.toISOString(),
        });
      } catch (error) {
        console.error('Error saving assistant message:', error);
      }

      try {
        await supabase
          .from('chat_sessions')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', sessionId);
      } catch (error) {
        console.error('Error updating session:', error);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Iron Lady AI Assistant</h1>
            <p className="text-xs text-gray-500">Your career growth partner</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {suggestions.length > 0 && (
            <SuggestionChips
              suggestions={suggestions}
              onSelect={handleSendMessage}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
