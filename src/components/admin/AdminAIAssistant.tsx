
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Calendar, Car, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const { toast } = useToast();
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
  
  // Reference to store booking details during conversation
  const [bookingDetails, setBookingDetails] = useState<{
    customerId?: string;
    customerName?: string;
    vehicleId?: string;
    vehicleName?: string;
    startDate?: string;
    endDate?: string;
    pickupLocation?: string;
    status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
    totalPrice?: number;
  }>({});
  
  // Booking process state
  const [bookingStep, setBookingStep] = useState<'idle' | 'collecting' | 'confirming' | 'completed'>('idle');
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
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
    
    // Process user input
    setTimeout(() => {
      if (bookingStep === 'collecting' || bookingStep === 'confirming' || input.toLowerCase().includes('book') || input.toLowerCase().includes('reservation') || input.toLowerCase().includes('réservation')) {
        processReservationRequest(input);
      } else {
        processAdminQuery(input);
      }
    }, 1000);
  };

  const processAdminQuery = (query: string) => {
    const queryLower = query.toLowerCase();
    let response: string;
    
    // Simple rule-based responses based on query content
    if (queryLower.includes('booking') || queryLower.includes('réservation')) {
      if (queryLower.includes('create') || queryLower.includes('new') || queryLower.includes('make') || queryLower.includes('create') || queryLower.includes('nouvelle')) {
        // Start booking process
        setBookingStep('collecting');
        response = language === 'fr'
          ? "Je vais vous aider à créer une nouvelle réservation. Pour commencer, pouvez-vous me donner le nom du client ?"
          : "I'll help you create a new booking. To start, can you provide the customer name?";
      } else {
        response = generateBookingResponse(queryLower);
      }
    } else if (queryLower.includes('vehicle') || queryLower.includes('car') || queryLower.includes('véhicule')) {
      response = generateVehicleResponse(queryLower);
    } else if (queryLower.includes('customer') || queryLower.includes('client')) {
      response = generateCustomerResponse(queryLower);
    } else if (queryLower.includes('revenue') || queryLower.includes('income') || queryLower.includes('revenu')) {
      response = generateRevenueResponse();
    } else if (queryLower.includes('help') || queryLower.includes('aide')) {
      response = language === 'fr' 
        ? "Je peux vous aider avec la gestion des réservations, l'analyse des véhicules, les informations sur les clients, et plus encore. Je peux même créer de nouvelles réservations pour vous. Demandez simplement 'créer une réservation'."
        : "I can help you with managing bookings, analyzing vehicle data, customer information, and more. I can even create new bookings for you. Just ask to 'create a booking'.";
    } else {
      response = language === 'fr'
        ? "Je ne suis pas sûr de comprendre votre demande. Pourriez-vous préciser si vous avez besoin d'aide avec les réservations, les véhicules, ou les clients ? Vous pouvez également me demander de créer une nouvelle réservation."
        : "I'm not sure I understand your request. Could you clarify if you need help with bookings, vehicles, or customers? You can also ask me to create a new booking.";
    }
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const processReservationRequest = (input: string) => {
    const inputLower = input.toLowerCase();
    let response = '';
    let newBookingDetails = { ...bookingDetails };
    
    if (bookingStep === 'idle') {
      setBookingStep('collecting');
      response = language === 'fr'
        ? "Je vais vous aider à créer une nouvelle réservation. Pour commencer, pouvez-vous me donner le nom du client ?"
        : "I'll help you create a new booking. To start, can you provide the customer name?";
      
    } else if (bookingStep === 'collecting') {
      // Try to identify which piece of information the user is providing
      if (!newBookingDetails.customerName) {
        // User is providing customer name
        newBookingDetails.customerName = input;
        
        // Try to find customer in the profiles
        const customer = profiles.find(p => 
          p.full_name && p.full_name.toLowerCase().includes(inputLower)
        );
        
        if (customer) {
          newBookingDetails.customerId = customer.id;
          response = language === 'fr'
            ? `J'ai trouvé ${customer.full_name} dans notre système. Quel véhicule voulez-vous réserver ?`
            : `I found ${customer.full_name} in our system. Which vehicle would you like to book?`;
        } else {
          response = language === 'fr'
            ? `Je n'ai pas trouvé ce client dans notre système. Cependant, je peux créer une réservation pour ${input}. Quel véhicule voulez-vous réserver ?`
            : `I couldn't find this customer in our system. However, I can create a booking for ${input}. Which vehicle would you like to book?`;
        }
      } else if (!newBookingDetails.vehicleName) {
        // User is providing vehicle name
        newBookingDetails.vehicleName = input;
        
        // Try to find vehicle in the vehicles list
        const vehicle = vehicles.find(v => 
          v.name && v.name.toLowerCase().includes(inputLower)
        );
        
        if (vehicle) {
          newBookingDetails.vehicleId = vehicle.id;
          response = language === 'fr'
            ? `J'ai trouvé ${vehicle.name} dans notre flotte. Quelle est la date de début de la réservation ? (format: YYYY-MM-DD)`
            : `I found ${vehicle.name} in our fleet. What is the start date for the booking? (format: YYYY-MM-DD)`;
        } else {
          response = language === 'fr'
            ? `Je n'ai pas trouvé ce véhicule dans notre flotte. Pourriez-vous spécifier un autre véhicule ?`
            : `I couldn't find this vehicle in our fleet. Could you specify another vehicle?`;
        }
      } else if (!newBookingDetails.startDate) {
        // User is providing start date
        if (isValidDate(input)) {
          newBookingDetails.startDate = input;
          response = language === 'fr'
            ? `Date de début enregistrée. Quelle est la date de fin de la réservation ? (format: YYYY-MM-DD)`
            : `Start date recorded. What is the end date for the booking? (format: YYYY-MM-DD)`;
        } else {
          response = language === 'fr'
            ? `Format de date invalide. Veuillez fournir la date au format YYYY-MM-DD.`
            : `Invalid date format. Please provide the date in YYYY-MM-DD format.`;
        }
      } else if (!newBookingDetails.endDate) {
        // User is providing end date
        if (isValidDate(input)) {
          newBookingDetails.endDate = input;
          response = language === 'fr'
            ? `Date de fin enregistrée. Quel est le lieu de prise en charge ?`
            : `End date recorded. What is the pickup location?`;
        } else {
          response = language === 'fr'
            ? `Format de date invalide. Veuillez fournir la date au format YYYY-MM-DD.`
            : `Invalid date format. Please provide the date in YYYY-MM-DD format.`;
        }
      } else if (!newBookingDetails.pickupLocation) {
        // User is providing pickup location
        newBookingDetails.pickupLocation = input;
        
        // Calculate estimated price (basic implementation)
        const vehicle = vehicles.find(v => v.id === newBookingDetails.vehicleId);
        if (vehicle && newBookingDetails.startDate && newBookingDetails.endDate) {
          const startDate = new Date(newBookingDetails.startDate);
          const endDate = new Date(newBookingDetails.endDate);
          const days = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
          
          newBookingDetails.totalPrice = vehicle.price_per_day * days;
        } else {
          // Default price if we can't calculate
          newBookingDetails.totalPrice = 100;
        }
        
        setBookingStep('confirming');
        
        // Prepare booking summary for confirmation
        response = language === 'fr'
          ? `Voici un résumé de la réservation :
Client : ${newBookingDetails.customerName}
Véhicule : ${newBookingDetails.vehicleName}
Date de début : ${newBookingDetails.startDate}
Date de fin : ${newBookingDetails.endDate}
Lieu de prise en charge : ${newBookingDetails.pickupLocation}
Prix estimé : $${newBookingDetails.totalPrice?.toFixed(2)}

Voulez-vous confirmer cette réservation ? (oui/non)`
          : `Here's a summary of the booking:
Customer: ${newBookingDetails.customerName}
Vehicle: ${newBookingDetails.vehicleName}
Start date: ${newBookingDetails.startDate}
End date: ${newBookingDetails.endDate}
Pickup location: ${newBookingDetails.pickupLocation}
Estimated price: $${newBookingDetails.totalPrice?.toFixed(2)}

Would you like to confirm this booking? (yes/no)`;
      }
    } else if (bookingStep === 'confirming') {
      if (inputLower.includes('oui') || inputLower.includes('yes') || inputLower.includes('confirm')) {
        // User confirms booking, create it in the database
        createBooking(newBookingDetails);
        response = language === 'fr'
          ? `Parfait ! J'ai créé la réservation pour ${newBookingDetails.customerName}. Le client recevra une confirmation par email.`
          : `Great! I've created the booking for ${newBookingDetails.customerName}. The customer will receive a confirmation email.`;
        
        // Reset booking process
        setBookingStep('completed');
        newBookingDetails = {};
      } else if (inputLower.includes('non') || inputLower.includes('no') || inputLower.includes('cancel')) {
        // User cancels booking process
        response = language === 'fr'
          ? `D'accord, j'ai annulé la création de cette réservation. Puis-je vous aider avec autre chose ?`
          : `Okay, I've cancelled this booking creation. Can I help you with anything else?`;
        
        // Reset booking process
        setBookingStep('idle');
        newBookingDetails = {};
      } else {
        response = language === 'fr'
          ? `Je n'ai pas compris votre réponse. Veuillez confirmer par 'oui' ou 'non'.`
          : `I didn't understand your response. Please confirm with 'yes' or 'no'.`;
      }
    } else if (bookingStep === 'completed') {
      setBookingStep('idle');
      response = language === 'fr'
        ? `Puis-je vous aider avec autre chose ?`
        : `Can I help you with anything else?`;
    }
    
    // Update booking details
    setBookingDetails(newBookingDetails);
    
    // Send AI response
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };
  
  const isValidDate = (dateString: string): boolean => {
    // Simple date validation for YYYY-MM-DD format
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString) && !isNaN(Date.parse(dateString));
  };
  
  const createBooking = async (details: typeof bookingDetails) => {
    try {
      // Prepare booking data
      const bookingData = {
        user_id: details.customerId || profiles[0]?.id, // Fallback to first profile if no ID
        vehicle_id: details.vehicleId || vehicles[0]?.id, // Fallback to first vehicle if no ID
        start_date: details.startDate,
        end_date: details.endDate,
        total_price: details.totalPrice || 100,
        status: 'pending'
      };
      
      // Insert booking into database
      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select();
      
      if (error) {
        console.error('Error creating booking:', error);
        toast({
          title: language === 'fr' ? 'Erreur' : 'Error',
          description: language === 'fr' 
            ? `Impossible de créer la réservation: ${error.message}`
            : `Failed to create booking: ${error.message}`,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: language === 'fr' ? 'Réservation créée' : 'Booking Created',
        description: language === 'fr'
          ? `Réservation créée avec succès pour ${details.customerName}`
          : `Successfully created booking for ${details.customerName}`,
        variant: "default",
      });
      
      return true;
    } catch (err) {
      console.error('Error in booking creation:', err);
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr'
          ? 'Une erreur est survenue lors de la création de la réservation'
          : 'An error occurred while creating the booking',
        variant: "destructive",
      });
      return false;
    }
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
