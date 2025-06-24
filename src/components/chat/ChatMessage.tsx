import { cn } from '@/lib/utils';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatMessage = ({ text, sender }: ChatMessageProps) => {
  return (
    // Add vertical padding for spacing between messages
    <div
      className={cn(
        'animate-fade-in group flex flex-col py-2',
        sender === 'user' ? 'items-end' : 'items-start'
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3',
          sender === 'user'
            ? // Use our new custom green variable for the user
              // Add rounded-br-none to create the "tail"
              'bg-[--chat-user-bg] text-[--chat-user-fg] rounded-br-none'
            : // Use a solid muted background for the bot
              // Add rounded-bl-none to create the "tail"
              'bg-muted text-foreground rounded-bl-none'
        )}
      >
        {text}
      </div>
    </div>
  );
};
