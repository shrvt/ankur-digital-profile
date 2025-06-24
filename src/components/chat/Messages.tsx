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
  }, [messages]);

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
        <div className="flex items-start gap-2">
          <div className="animate-pulse flex space-x-2 py-2">
            <div className="h-2 w-2 bg-muted-foreground/40 rounded-full"></div>
            <div className="h-2 w-2 bg-muted-foreground/40 rounded-full"></div>
            <div className="h-2 w-2 bg-muted-foreground/40 rounded-full"></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
