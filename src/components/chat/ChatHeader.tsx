import { ArrowLeft, ChevronDown, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  toggleChat: () => void;
}

export const ChatHeader = ({
  isExpanded,
  toggleExpand,
  toggleChat,
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleChat}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="font-medium text-foreground">Chat with Ankur</h2>
          <p className="text-xs text-muted-foreground">
            Ask me anything about my experience
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleExpand}
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              !isExpanded && 'rotate-180'
            )}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleChat}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
