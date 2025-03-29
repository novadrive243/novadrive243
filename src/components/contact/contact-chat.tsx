
import React, { useState } from 'react';
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Bot } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Types for messages
type MessageType = "user" | "bot";

interface Message {
  id: number;
  type: MessageType;
  text: string;
  timestamp: Date;
}

const ContactChat = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: language === 'fr' 
        ? 'Bonjour! Comment puis-je vous aider aujourd\'hui?' 
        : 'Hello! How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Quick replies based on common questions
  const quickReplies = [
    {
      fr: "Comment réserver un chauffeur?",
      en: "How do I book a driver?"
    },
    {
      fr: "Quels sont vos tarifs?",
      en: "What are your rates?"
    },
    {
      fr: "Quelles zones desservez-vous?",
      en: "What areas do you serve?"
    }
  ];
  
  // Get response from ChatGPT
  const getChatGPTResponse = async (userMessage: string): Promise<string> => {
    try {
      setIsLoading(true);
      
      const systemPrompt = language === 'fr' 
        ? "Tu es un assistant virtuel pour NovaDrive, un service de chauffeur de luxe à Kinshasa, Congo. Réponds de manière professionnelle, concise et utile. Utilise un ton amical mais formel. Limite tes réponses à 3-4 phrases maximum. Réponds en français."
        : "You are a virtual assistant for NovaDrive, a luxury chauffeur service in Kinshasa, Congo. Answer in a professional, concise, and helpful manner. Use a friendly but formal tone. Limit your responses to 3-4 sentences maximum. Answer in English.";
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // This should be replaced with an environment variable
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      return language === 'fr'
        ? "Désolé, je rencontre des difficultés techniques. Veuillez réessayer plus tard ou contactez-nous directement par téléphone."
        : "Sorry, I'm experiencing technical difficulties. Please try again later or contact us directly by phone.";
    } finally {
      setIsLoading(false);
    }
  };
  
  // Use fallback responses if API fails
  const getFallbackResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Using language-specific responses
    if (language === 'fr') {
      if (lowercaseMessage.includes('réserv') || lowercaseMessage.includes('chauffeur') || lowercaseMessage.includes('book')) {
        return 'Pour réserver un chauffeur, rendez-vous sur notre page de réservation ou appelez-nous au +243 999 999 999. Nous vous demanderons vos coordonnées et vos préférences de trajet.';
      } else if (lowercaseMessage.includes('tarif') || lowercaseMessage.includes('prix') || lowercaseMessage.includes('cost')) {
        return 'Nos tarifs varient selon le type de véhicule et la durée. Vous pouvez consulter notre page de tarification pour plus de détails. Souhaitez-vous que je vous y dirige?';
      } else if (lowercaseMessage.includes('zone') || lowercaseMessage.includes('région') || lowercaseMessage.includes('area')) {
        return 'Nous desservons toute la ville de Kinshasa et ses environs. Pour les trajets en dehors de la ville, veuillez nous contacter à l\'avance pour vérifier la disponibilité.';
      } else {
        return 'Merci pour votre message. Si vous avez des questions spécifiques, n\'hésitez pas à demander. Vous pouvez aussi nous contacter directement par téléphone ou email pour une assistance personnalisée.';
      }
    } else {
      if (lowercaseMessage.includes('book') || lowercaseMessage.includes('driver')) {
        return 'To book a driver, go to our booking page or call us at +243 999 999 999. We will ask for your details and travel preferences.';
      } else if (lowercaseMessage.includes('rate') || lowercaseMessage.includes('price') || lowercaseMessage.includes('cost')) {
        return 'Our rates vary depending on the type of vehicle and duration. You can check our pricing page for more details. Would you like me to direct you there?';
      } else if (lowercaseMessage.includes('area') || lowercaseMessage.includes('region') || lowercaseMessage.includes('zone')) {
        return 'We serve the entire city of Kinshasa and its surroundings. For trips outside the city, please contact us in advance to check availability.';
      } else {
        return 'Thank you for your message. If you have any specific questions, feel free to ask. You can also contact us directly by phone or email for personalized assistance.';
      }
    }
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Processing indicator
    const processingBotMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: language === 'fr' ? "..." : "...",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, processingBotMessage]);
    
    try {
      // Get response from ChatGPT
      const chatGPTResponse = await getChatGPTResponse(inputValue);
      
      // Update the processing message with the actual response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === processingBotMessage.id 
            ? { ...msg, text: chatGPTResponse } 
            : msg
        )
      );
    } catch (error) {
      console.error('Error getting ChatGPT response:', error);
      
      // Use fallback response if ChatGPT fails
      const fallbackResponse = getFallbackResponse(inputValue);
      
      // Update the processing message with the fallback response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === processingBotMessage.id 
            ? { ...msg, text: fallbackResponse } 
            : msg
        )
      );
      
      // Show toast notification about the issue
      toast({
        title: language === 'fr' ? "Problème de connexion" : "Connection issue",
        description: language === 'fr' 
          ? "Nous utilisons actuellement des réponses préprogrammées en raison d'un problème technique." 
          : "We're currently using pre-programmed responses due to a technical issue.",
        variant: "destructive",
      });
    }
  };
  
  const handleQuickReply = async (text: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: text,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Processing indicator
    const processingBotMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: language === 'fr' ? "..." : "...",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, processingBotMessage]);
    
    try {
      // Get response from ChatGPT
      const chatGPTResponse = await getChatGPTResponse(text);
      
      // Update the processing message with the actual response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === processingBotMessage.id 
            ? { ...msg, text: chatGPTResponse } 
            : msg
        )
      );
    } catch (error) {
      console.error('Error getting ChatGPT response:', error);
      
      // Use fallback response if ChatGPT fails
      const fallbackResponse = getFallbackResponse(text);
      
      // Update the processing message with the fallback response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === processingBotMessage.id 
            ? { ...msg, text: fallbackResponse } 
            : msg
        )
      );
    }
  };
  
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
              <Bot className="h-5 w-5 text-nova-gold" />
              {t('contact.chatTitle') || 'NovaDrive Assistant'}
            </DrawerTitle>
          </DrawerHeader>
          
          <div className="flex flex-col p-4 h-[50vh] overflow-y-auto">
            {/* Message thread */}
            <div className="flex flex-col space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-nova-gold text-nova-black"
                        : "bg-nova-gray/30 text-nova-white"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick replies */}
            {messages.length < 3 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-nova-white border-nova-gold/30 text-sm"
                    onClick={() => handleQuickReply(language === 'fr' ? reply.fr : reply.en)}
                    disabled={isLoading}
                  >
                    {language === 'fr' ? reply.fr : reply.en}
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          <DrawerFooter className="border-t border-nova-gold/30">
            <div className="flex items-center space-x-2">
              <Textarea
                placeholder={t('contact.chatPlaceholder') || "Type your message..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="gold-btn h-[60px]"
                disabled={isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
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

export default ContactChat;
