
import React from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot, WifiOff } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useChat } from './hooks/useChat';
import { MessagesList } from './components/MessagesList';
import { QuickReplies } from './components/QuickReplies';
import { ChatInput } from './components/ChatInput';
import { useDebounce } from './hooks/useDebounce';

/**
 * Main contact chat drawer component
 */
const ContactChatDrawer = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleQuickReply,
    useFallback
  } = useChat(language);
  
  // Debounce input value to reduce unnecessary renders
  const debouncedInputValue = useDebounce(inputValue, 300);
  
  return (
    <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            className="rounded-full fixed bottom-6 right-6 w-16 h-16 shadow-lg gold-btn"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader className="border-b border-nova-gold/30">
            <DrawerTitle className="flex items-center gap-2">
              {useFallback ? (
                <WifiOff className="h-5 w-5 text-red-500" />
              ) : (
                <Bot className="h-5 w-5 text-nova-gold" />
              )}
              {t('contact.chatTitle') || 'NovaDrive Assistant'}
              {useFallback && (
                <span className="text-xs font-normal text-red-500 ml-2">
                  {language === 'fr' ? '(Mode hors ligne)' : '(Offline mode)'}
                </span>
              )}
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="flex flex-col p-4 h-[50vh] overflow-y-auto">
            {/* Message thread */}
            <MessagesList 
              messages={messages} 
              messagesEndRef={messagesEndRef} 
            />
            
            {/* Quick replies */}
            <QuickReplies
              language={language}
              messagesCount={messages.length}
              onQuickReply={handleQuickReply}
              isLoading={isLoading}
            />
          </div>
          
          <DrawerFooter className="border-t border-nova-gold/30">
            <ChatInput
              placeholder={t('contact.chatPlaceholder') || "Type your message..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
            <DrawerClose asChild>
              <Button variant="outline" className="w-full mt-2">
                {t('contact.chatClose') || "Close"}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ContactChatDrawer;
