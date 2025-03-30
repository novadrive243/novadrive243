
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface AdminAIAssistantProps {
  language: string;
  bookings?: any[];
  vehicles?: any[];
  profiles?: any[];
}

export const AdminAIAssistant = ({ language, bookings = [], vehicles = [], profiles = [] }: AdminAIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: language === 'fr' 
        ? "Bonjour, je suis votre assistant d'administration NovaDrive. Comment puis-je vous aider aujourd'hui avec la gestion des réservations, des véhicules ou des clients ?"
        : "Hello, I'm your NovaDrive admin assistant. How can I help you today with managing bookings, vehicles, or customers?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-scroll the messages area when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      processAdminQuery(input);
    }, 1000);
  };

  const processAdminQuery = (query: string) => {
    const queryLower = query.toLowerCase();
    let response: string;
    
    // Simple rule-based responses based on query content
    if (queryLower.includes('booking') || queryLower.includes('réservation')) {
      response = generateBookingResponse(queryLower);
    } else if (queryLower.includes('vehicle') || queryLower.includes('car') || queryLower.includes('véhicule')) {
      response = generateVehicleResponse(queryLower);
    } else if (queryLower.includes('customer') || queryLower.includes('client')) {
      response = generateCustomerResponse(queryLower);
    } else if (queryLower.includes('revenue') || queryLower.includes('income') || queryLower.includes('revenu')) {
      response = generateRevenueResponse();
    } else if (queryLower.includes('help') || queryLower.includes('aide')) {
      response = language === 'fr' 
        ? "Je peux vous aider avec la gestion des réservations, l'analyse des véhicules, les informations sur les clients, et plus encore. Posez-moi simplement une question spécifique."
        : "I can help you with managing bookings, analyzing vehicle data, customer information, and more. Just ask me a specific question.";
    } else {
      response = language === 'fr'
        ? "Je ne suis pas sûr de comprendre votre demande. Pourriez-vous préciser si vous avez besoin d'aide avec les réservations, les véhicules, ou les clients ?"
        : "I'm not sure I understand your request. Could you clarify if you need help with bookings, vehicles, or customers?";
    }
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };
  
  const generateBookingResponse = (query: string): string => {
    const bookingCount = bookings.length;
    
    if (query.includes('count') || query.includes('many') || query.includes('nombre')) {
      return language === 'fr'
        ? `Il y a actuellement ${bookingCount} réservations dans le système.`
        : `There are currently ${bookingCount} bookings in the system.`;
    }
    
    if (query.includes('recent') || query.includes('latest') || query.includes('récent')) {
      if (bookingCount === 0) {
        return language === 'fr'
          ? "Il n'y a pas de réservations dans le système."
          : "There are no bookings in the system.";
      }
      
      // Sort bookings by date and get the most recent
      const sortedBookings = [...bookings].sort((a, b) => 
        new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime()
      );
      
      const recent = sortedBookings[0];
      return language === 'fr'
        ? `La réservation la plus récente a été faite par ${recent.customer_name} pour la date ${new Date(recent.booking_date).toLocaleDateString('fr-FR')}. Véhicule: ${recent.vehicle_name}.`
        : `The most recent booking was made by ${recent.customer_name} for date ${new Date(recent.booking_date).toLocaleDateString('en-US')}. Vehicle: ${recent.vehicle_name}.`;
    }
    
    return language === 'fr'
      ? `Nous avons ${bookingCount} réservations au total. Souhaitez-vous des informations spécifiques sur les réservations ? Par exemple, les réservations récentes ou le nombre total ?`
      : `We have ${bookingCount} total bookings. Would you like specific information about bookings? For instance, recent bookings or total counts?`;
  };
  
  const generateVehicleResponse = (query: string): string => {
    const vehicleCount = vehicles.length;
    
    if (query.includes('count') || query.includes('many') || query.includes('nombre')) {
      return language === 'fr'
        ? `Nous avons actuellement ${vehicleCount} véhicules dans notre flotte.`
        : `We currently have ${vehicleCount} vehicles in our fleet.`;
    }
    
    if (query.includes('available') || query.includes('disponible')) {
      const availableCount = vehicles.filter(v => v.status === 'available').length;
      return language === 'fr'
        ? `Il y a actuellement ${availableCount} véhicules disponibles à la location.`
        : `There are currently ${availableCount} vehicles available for rental.`;
    }
    
    if (query.includes('popular') || query.includes('populaire')) {
      // This would require data analysis to provide a real answer
      return language === 'fr'
        ? "Basé sur nos données récentes, les SUV de luxe et les berlines de classe exécutive sont les plus populaires parmi nos clients."
        : "Based on our recent data, luxury SUVs and executive sedans are the most popular among our customers.";
    }
    
    return language === 'fr'
      ? `Notre flotte comprend ${vehicleCount} véhicules. Souhaitez-vous connaître les véhicules disponibles, les plus populaires, ou avez-vous une autre question sur la flotte ?`
      : `Our fleet includes ${vehicleCount} vehicles. Would you like to know about available vehicles, the most popular ones, or do you have another fleet-related question?`;
  };
  
  const generateCustomerResponse = (query: string): string => {
    const customerCount = profiles.length;
    
    if (query.includes('count') || query.includes('many') || query.includes('nombre')) {
      return language === 'fr'
        ? `Nous avons actuellement ${customerCount} clients enregistrés dans notre système.`
        : `We currently have ${customerCount} registered customers in our system.`;
    }
    
    if (query.includes('new') || query.includes('nouveaux')) {
      // Assuming the last registered are the newest
      const newCustomersCount = 5;  // Placeholder logic
      return language === 'fr'
        ? `Nous avons enregistré environ ${newCustomersCount} nouveaux clients au cours du dernier mois.`
        : `We've registered approximately ${newCustomersCount} new customers in the past month.`;
    }
    
    return language === 'fr'
      ? `Nous avons ${customerCount} clients enregistrés. Souhaitez-vous des informations spécifiques sur nos clients, comme les clients récents ou des statistiques ?`
      : `We have ${customerCount} registered customers. Would you like specific information about our customers, such as recent customers or statistics?`;
  };
  
  const generateRevenueResponse = (): string => {
    // Placeholder revenue data
    const monthlyRevenue = bookings.length * 500; // Very simple estimate
    const previousMonthRevenue = monthlyRevenue * 0.9;
    const percentChange = ((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
    
    return language === 'fr'
      ? `Le revenu mensuel estimé est de $${monthlyRevenue.toLocaleString('fr-FR')}. C'est une augmentation de ${percentChange.toFixed(1)}% par rapport au mois précédent.`
      : `The estimated monthly revenue is $${monthlyRevenue.toLocaleString('en-US')}. This is a ${percentChange.toFixed(1)}% increase from the previous month.`;
  };

  return (
    <div className="flex flex-col h-[70vh] rounded-lg overflow-hidden border border-nova-gold/20 bg-nova-black">
      <div className="p-4 border-b border-nova-gold/20 bg-nova-gray/20">
        <h2 className="text-lg font-medium text-nova-gold flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          {language === 'fr' ? "Assistant Admin IA" : "Admin AI Assistant"}
        </h2>
      </div>
      
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <Card 
                className={`max-w-[80%] p-3 ${
                  message.role === 'assistant' 
                    ? 'bg-nova-gray/30 border-nova-gold/20' 
                    : 'bg-nova-gray/20 border-nova-gold/30'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    {message.role === 'assistant' ? (
                      <Bot className="h-5 w-5 text-nova-gold" />
                    ) : (
                      <User className="h-5 w-5 text-nova-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-nova-white">{message.content}</p>
                    <p className="text-xs text-nova-white/50 mt-1">
                      {message.timestamp.toLocaleTimeString(
                        language === 'fr' ? 'fr-FR' : 'en-US', 
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-3 bg-nova-gray/30 border-nova-gold/20">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-nova-gold" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-nova-gold/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-nova-gold/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-nova-gold/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-nova-gold/20 bg-nova-gray/10">
        <div className="flex gap-2">
          <Textarea
            placeholder={language === 'fr' ? "Posez une question..." : "Ask a question..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="min-h-10 resize-none bg-nova-gray/20 border-nova-gold/30 focus-visible:ring-nova-gold/50"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isProcessing}
            className="bg-nova-gold text-nova-black hover:bg-nova-gold/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
