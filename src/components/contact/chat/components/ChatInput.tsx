
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  isLoading: boolean;
}

/**
 * Component for chat input and send button
 */
export const ChatInput: React.FC<ChatInputProps> = ({ 
  placeholder, 
  value, 
  onChange, 
  onSend, 
  isLoading 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 min-h-[60px]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        disabled={isLoading}
      />
      <Button
        onClick={onSend}
        size="icon"
        className="gold-btn h-[60px]"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-white" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
