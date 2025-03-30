
import React from 'react';
import { Button } from "@/components/ui/button";
import { QUICK_REPLIES } from '../constants';

interface QuickRepliesProps {
  language: 'fr' | 'en';
  messagesCount: number;
  onQuickReply: (text: string) => void;
  isLoading: boolean;
}

/**
 * Component to display quick reply options
 */
export const QuickReplies: React.FC<QuickRepliesProps> = ({ 
  language, 
  messagesCount, 
  onQuickReply, 
  isLoading 
}) => {
  // Only show quick replies at the beginning of the conversation
  if (messagesCount >= 3) return null;
  
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {QUICK_REPLIES.map((reply, index) => (
        <Button
          key={index}
          variant="outline"
          className="text-nova-white border-nova-gold/30 text-sm"
          onClick={() => onQuickReply(language === 'fr' ? reply.fr : reply.en)}
          disabled={isLoading}
        >
          {language === 'fr' ? reply.fr : reply.en}
        </Button>
      ))}
    </div>
  );
};
