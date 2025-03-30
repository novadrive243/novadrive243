
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Banknote, ArrowRight, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface BookingStepThreePaymentProps {
  language: string;
  date: Date | undefined;
  time: string;
  durationType: 'hourly' | 'daily' | 'monthly';
  getDurationLabel: () => string;
  getSelectedVehicle: () => any;
  calculateTotalPrice: () => string;
  calculateDepositAmount: () => string;
  paymentMethod: string | null;
  paymentMethods: Array<{ id: string; name: string; icon: string }>;
  handlePaymentMethodSelect: (methodId: string) => void;
  handlePrevious: () => void;
  handleConfirmBooking: () => void;
  isProcessing: boolean;
}

export const BookingStepThreePayment = ({
  language,
  date,
  time,
  durationType,
  getDurationLabel,
  getSelectedVehicle,
  calculateTotalPrice,
  calculateDepositAmount,
  paymentMethod,
  paymentMethods,
  handlePaymentMethodSelect,
  handlePrevious,
  handleConfirmBooking,
  isProcessing
}: BookingStepThreePaymentProps) => {
  const [depositPaymentMethod, setDepositPaymentMethod] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('online');

  // Filter out cash method for deposit payments
  const onlinePaymentMethods = paymentMethods.filter(m => m.id !== 'cash');
  
  const handleDepositMethodSelect = (methodId: string) => {
    setDepositPaymentMethod(methodId);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const canConfirmBooking = () => {
    if (paymentMethod === 'cash') {
      return !!depositPaymentMethod; // Require deposit payment method for cash
    }
    return !!paymentMethod; // For online payments, just require payment method
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        onClick={handlePrevious} 
        variant="outline" 
        className="mb-4 border-nova-gold/50 text-nova-gold"
      >
        {language === 'fr' ? 'Retour' : 'Back'}
      </Button>
      
      <Card className="bg-nova-gray/30 border border-nova-gold/30">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-nova-white">
            {language === 'fr' ? 'Paiement' : 'Payment'}
          </h2>
          
          <div className="bg-nova-black/50 rounded-lg p-4 mb-6">
            <h3 className="text-nova-white font-medium mb-2">
              {language === 'fr' ? 'Résumé de la réservation' : 'Booking Summary'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-nova-white/70">
                  {language === 'fr' ? 'Date:' : 'Date:'}
                </span>
                <span className="text-nova-white">
                  {date ? format(date, "PPP", { locale: language === 'fr' ? fr : enUS }) : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-nova-white/70">
                  {language === 'fr' ? 'Heure:' : 'Time:'}
                </span>
                <span className="text-nova-white">{time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-nova-white/70">
                  {language === 'fr' ? 'Durée:' : 'Duration:'}
                </span>
                <span className="text-nova-white">
                  {getDurationLabel()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-nova-white/70">
                  {language === 'fr' ? 'Véhicule:' : 'Vehicle:'}
                </span>
                <span className="text-nova-white">
                  {getSelectedVehicle()?.name}
                </span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-nova-white/10">
                <span className="text-nova-white">
                  {language === 'fr' ? 'Prix total:' : 'Total price:'}
                </span>
                <span className="text-nova-gold">
                  ${calculateTotalPrice()}
                </span>
              </div>
              {paymentMethod && paymentMethod !== 'cash' && (
                <div className="text-right text-xs text-nova-gold">
                  {language === 'fr' 
                    ? '(Remise de 5% appliquée pour paiement en ligne)' 
                    : '(5% discount applied for online payment)'}
                </div>
              )}
              {paymentMethod && (
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-nova-white/10">
                  <span className="text-nova-white font-medium">
                    {language === 'fr' ? 'Dépôt requis (25%):' : 'Required deposit (25%):'}
                  </span>
                  <span className="text-nova-gold font-medium">
                    ${calculateDepositAmount()}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-nova-white font-medium mb-3">
              {language === 'fr' ? 'Méthode de paiement' : 'Payment Method'}
            </h3>
            
            <Tabs defaultValue="online" onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-2 w-full bg-nova-gray">
                <TabsTrigger value="online" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  {language === 'fr' ? 'En ligne' : 'Online'}
                </TabsTrigger>
                <TabsTrigger value="cash" className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  {language === 'fr' ? 'Espèces' : 'Cash'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="online" className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  {onlinePaymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className={`p-3 rounded border cursor-pointer transition-all flex items-center ${
                        paymentMethod === method.id 
                          ? 'border-nova-gold bg-nova-gold/10' 
                          : 'border-nova-gray/50 hover:border-nova-gold/50'
                      }`}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                    >
                      <span className="mr-2">{method.icon}</span>
                      <span className="text-nova-white text-sm">{method.name}</span>
                      {paymentMethod === method.id && (
                        <CheckCircle className="h-4 w-4 text-nova-gold ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-nova-gold mt-2">
                  {language === 'fr' 
                    ? 'Remise de 5% pour paiement en ligne' 
                    : '5% discount for online payment'}
                </p>
                
                {paymentMethod && paymentMethod !== 'cash' && (
                  <div className="mt-4 p-3 bg-nova-gold/10 border border-nova-gold/30 rounded-md">
                    <p className="text-sm text-nova-white">
                      {language === 'fr' 
                        ? `Un dépôt de $${calculateDepositAmount()} est requis pour confirmer votre réservation.` 
                        : `A deposit of $${calculateDepositAmount()} is required to confirm your booking.`}
                    </p>
                    <p className="text-xs text-nova-white/70 mt-1">
                      {language === 'fr' 
                        ? 'Le solde restant sera payé lors de la livraison du véhicule.' 
                        : 'The remaining balance will be paid upon vehicle delivery.'}
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="cash" className="mt-4">
                <div 
                  className={`p-3 rounded border cursor-pointer transition-all flex items-center ${
                    paymentMethod === 'cash' 
                      ? 'border-nova-gold bg-nova-gold/10' 
                      : 'border-nova-gray/50 hover:border-nova-gold/50'
                  }`}
                  onClick={() => handlePaymentMethodSelect('cash')}
                >
                  <span className="mr-2">💵</span>
                  <span className="text-nova-white text-sm">
                    {language === 'fr' ? 'Paiement en espèces' : 'Cash payment'}
                  </span>
                  {paymentMethod === 'cash' && (
                    <CheckCircle className="h-4 w-4 text-nova-gold ml-auto" />
                  )}
                </div>
                
                {paymentMethod === 'cash' && (
                  <div className="mt-4">
                    <div className="p-3 bg-nova-gold/10 border border-nova-gold/30 rounded-md mb-4">
                      <p className="text-sm text-nova-white font-medium">
                        {language === 'fr' 
                          ? 'Un dépôt en ligne est requis pour les réservations en espèces' 
                          : 'An online deposit is required for cash bookings'}
                      </p>
                      <p className="text-xs text-nova-white/70 mt-1">
                        {language === 'fr' 
                          ? `Veuillez sélectionner une méthode de paiement en ligne pour votre dépôt de $${calculateDepositAmount()}.` 
                          : `Please select an online payment method for your deposit of $${calculateDepositAmount()}.`}
                      </p>
                    </div>
                    
                    <h4 className="text-sm font-medium text-nova-white mb-2">
                      {language === 'fr' 
                        ? 'Méthode de paiement pour le dépôt:' 
                        : 'Deposit payment method:'}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {onlinePaymentMethods.map((method) => (
                        <div 
                          key={method.id}
                          className={`p-3 rounded border cursor-pointer transition-all flex items-center ${
                            depositPaymentMethod === method.id 
                              ? 'border-nova-gold bg-nova-gold/10' 
                              : 'border-nova-gray/50 hover:border-nova-gold/50'
                          }`}
                          onClick={() => handleDepositMethodSelect(method.id)}
                        >
                          <span className="mr-2">{method.icon}</span>
                          <span className="text-nova-white text-sm">{method.name}</span>
                          {depositPaymentMethod === method.id && (
                            <CheckCircle className="h-4 w-4 text-nova-gold ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-2 text-xs text-nova-white/70">
                      {language === 'fr' 
                        ? `Le solde restant de $${(parseFloat(calculateTotalPrice()) - parseFloat(calculateDepositAmount())).toFixed(2)} sera payé en espèces à la livraison.`
                        : `The remaining balance of $${(parseFloat(calculateTotalPrice()) - parseFloat(calculateDepositAmount())).toFixed(2)} will be paid in cash upon delivery.`}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <Button 
            className="w-full gold-btn"
            disabled={!canConfirmBooking() || isProcessing}
            onClick={handleConfirmBooking}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {language === 'fr' ? 'Traitement en cours...' : 'Processing...'}
              </span>
            ) : (
              <>
                {language === 'fr' ? 'Confirmer la réservation' : 'Confirm booking'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
