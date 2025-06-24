import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { forwardRef } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSending: boolean;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ value, onChange, onKeyDown, onSubmit, isSending }, ref) => {
    return (
      <form
        onSubmit={onSubmit}
        // Added padding and a subtle top border
        className="border-t border-border p-4 flex items-end gap-3 bg-background"
      >
        <Textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Type your message..."
          rows={1}
          // Use our custom variables for the input area
          // Added focus ring styles
          className="min-h-[44px] max-h-32 resize-none flex-1 rounded-full border border-border bg-[--chat-input-bg] px-4 py-2.5 text-sm text-[--chat-input-fg] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
          disabled={isSending}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isSending || !value.trim()}
          // Make the button round and use our custom green
          className="shrink-0 h-11 w-11 rounded-full bg-[--chat-user-bg] text-[--chat-user-fg] hover:opacity-90 disabled:opacity-50"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </form>
    );
  }
);

ChatInput.displayName = 'ChatInput';
