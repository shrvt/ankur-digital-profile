import { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { ChatHeader } from './chat/ChatHeader';
import { Messages } from './chat/Messages';
import { ChatInput } from './chat/ChatInput';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WEBHOOK_URL =
  'http://localhost:5678/webhook/2baf8717-6f35-4a23-84dc-93b1054e49a1/chat';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I can answer questions about Ankur's experience, skills, or projects. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim() === '' || isSending) return;

    const userMessage = {
      text: inputValue.trim(),
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          userId: 'website-visitor',
          timestamp: userMessage.timestamp.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const botResponse = {
        text:
          data.reply || "Thanks for your message! I'll get back to you soon.",
        sender: 'bot' as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });

      // Fallback response in case of error
      const errorResponse = {
        text: "I'm having trouble connecting right now. Please try again later.",
        sender: 'bot' as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsSending(false);
    }
  };

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg animate-fade-in"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 w-[380px] bg-background rounded-lg border border-border shadow-lg overflow-hidden',
        'transition-all duration-300 animate-scale-in'
      )}
    >
      <ChatHeader
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        toggleChat={toggleChat}
      />
      <Messages
        messages={messages}
        isSending={isSending}
        isExpanded={isExpanded}
      />
      {isExpanded && (
        <ChatInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onSubmit={handleSendMessage}
          isSending={isSending}
        />
      )}
    </div>
  );
};

export default Chatbot;
