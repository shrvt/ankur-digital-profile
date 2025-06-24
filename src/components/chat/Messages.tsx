// src/components/chat/Messages.tsx (Final Code)

import { MessageSquare } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface MessagesProps {
  messages: Message[];
  isSending: boolean;
  isExpanded: boolean;
}

export const Messages = ({
  messages,
  isSending,
  isExpanded,
}: MessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSending]);

  return (
    <div
      className={cn(
        'flex-1 overflow-y-auto p-4 space-y-4 transition-all duration-300',
        isExpanded ? 'h-[380px]' : 'h-0'
      )}
    >
      {messages.map((message, index) => (
        <div key={index}>
          {message.sender === 'bot' && index === 0 && (
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-muted/50 rounded-full p-2 h-8 w-8 flex items-center justify-center">
                <MessageSquare className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Ankur's Assistant
              </span>
            </div>
          )}
          <ChatMessage
            text={message.text}
            sender={message.sender}
            timestamp={message.timestamp}
          />
        </div>
      ))}

      {isSending && (
        <div className="flex items-end gap-2">
          {/* Avatar */}
          <div className="bg-muted/50 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0">
            <MessageSquare className="h-4 w-4" />
          </div>
          {/* Bubble with pulsing dots */}
          <div className="bg-secondary rounded-lg px-4 py-3">
            <div className="animate-pulse flex space-x-1.5">
              <div
                className="h-2 w-2 bg-primary rounded-full"
                style={{ animationDelay: '0s' }}
              ></div>
              <div
                className="h-2 w-2 bg-primary rounded-full"
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div
                className="h-2 w-2 bg-primary rounded-full"
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
