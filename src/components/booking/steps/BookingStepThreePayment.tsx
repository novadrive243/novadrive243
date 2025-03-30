
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Banknote, ArrowRight, CheckCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface BookingStepThreePaymentProps {
  language: string;
  date: Date | undefined;
  time: string;
  durationType: 'hourly' | 'daily' | 'monthly';
  getDurationLabel: () => string;
  getSelectedVehicle: () => any;
  calculateTotalPrice: () => string;
  calculateDepositAmount: () => string;
  calculateInstallmentAmount: () => string;
  paymentMethod: string | null;
  paymentMethods: Array<{ id: string; name: string; icon: string }>;
  handlePaymentMethodSelect: (methodId: string) => void;
  depositPaymentMethod: string | null;
  handleDepositPaymentMethodSelect: (methodId: string) => void;
  installmentOption: 'full' | 'three_installments';
  handleInstallmentOptionSelect: (option: 'full' | 'three_installments') => void;
  isThreeInstallmentsEligible: () => boolean;
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
  calculateInstallmentAmount,
  paymentMethod,
  paymentMethods,
  handlePaymentMethodSelect,
  depositPaymentMethod,
  handleDepositPaymentMethodSelect,
  installmentOption,
  handleInstallmentOptionSelect,
  isThreeInstallmentsEligible,
  handlePrevious,
  handleConfirmBooking,
  isProcessing
}: BookingStepThreePaymentProps) => {
  const [activeTab, setActiveTab] = useState<string>('online');
  
  // Filter out cash method for deposit payments
  const onlinePaymentMethods = paymentMethods.filter(m => m.id !== 'cash');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'cash') {
      handlePaymentMethodSelect('cash');
    } else if (activeTab === 'cash' && value === 'online') {
      // Reset payment method when switching from cash to online
      handlePaymentMethodSelect('');
    }
  };
  
  const canConfirmBooking = () => {
    if (paymentMethod === 'cash') {
      return !!depositPaymentMethod; // Require deposit payment method for cash
    }
    return !!paymentMethod; // For online payments, just require payment method
  };

  // Check if three installments option is eligible
  const showInstallmentOption = isThreeInstallmentsEligible() && activeTab === 'online';

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
              {paymentMethod && paymentMethod === 'cash' && (
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-nova-white/10">
                  <span className="text-nova-white font-medium">
                    {language === 'fr' ? 'Dépôt requis (25%):' : 'Required deposit (25%):'}
                  </span>
                  <span className="text-nova-gold font-medium">
                    ${calculateDepositAmount()}
                  </span>
                </div>
              )}
              {paymentMethod && paymentMethod !== 'cash' && installmentOption === 'three_installments' && (
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-nova-white/10">
                  <span className="text-nova-white font-medium">
                    {language === 'fr' ? 'Paiement par versement (3x):' : 'Payment in installments (3x):'}
                  </span>
                  <span className="text-nova-gold font-medium">
                    ${calculateInstallmentAmount()} x 3
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
                
                {showInstallmentOption && paymentMethod && paymentMethod !== 'cash' && (
                  <div className="mt-6 border-t border-nova-white/10 pt-4">
                    <h4 className="text-sm font-medium text-nova-white mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-nova-gold" />
                      {language === 'fr' ? 'Options de paiement:' : 'Payment Options:'}
                    </h4>
                    
                    <RadioGroup 
                      value={installmentOption} 
                      onValueChange={(value) => handleInstallmentOptionSelect(value as 'full' | 'three_installments')}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-2 p-3 rounded border border-nova-gray/50 hover:border-nova-gold/50">
                        <RadioGroupItem value="full" id="full-payment" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="full-payment" className="text-nova-white">
                            {language === 'fr' ? 'Paiement intégral' : 'Full payment'}
                          </Label>
                          <p className="text-xs text-nova-white/70">
                            {language === 'fr' 
                              ? `Payer le montant total de $${calculateTotalPrice()} maintenant.` 
                              : `Pay the full amount of $${calculateTotalPrice()} now.`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2 p-3 rounded border border-nova-gray/50 hover:border-nova-gold/50">
                        <RadioGroupItem value="three_installments" id="installments" className="mt-1" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="installments" className="text-nova-white flex items-center">
                            {language === 'fr' ? 'Payer en 3 fois' : 'Pay in 3 installments'}
                            <span className="ml-2 px-2 py-0.5 bg-nova-gold/20 text-nova-gold rounded text-xs">
                              {language === 'fr' ? 'Nouveau' : 'New'}
                            </span>
                          </Label>
                          <p className="text-xs text-nova-white/70">
                            {language === 'fr' 
                              ? `Payez $${calculateInstallmentAmount()} maintenant, puis deux versements égaux dans les prochains jours.` 
                              : `Pay $${calculateInstallmentAmount()} now, followed by two equal payments in the coming days.`}
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}
                
                {paymentMethod && paymentMethod !== 'cash' && (
                  <div className="mt-4 p-3 bg-nova-gold/10 border border-nova-gold/30 rounded-md">
                    {installmentOption === 'three_installments' ? (
                      <>
                        <p className="text-sm text-nova-white">
                          {language === 'fr' 
                            ? `Premier versement de $${calculateInstallmentAmount()} requis aujourd'hui.` 
                            : `First installment of $${calculateInstallmentAmount()} required today.`}
                        </p>
                        <p className="text-xs text-nova-white/70 mt-1">
                          {language === 'fr' 
                            ? 'Les deux versements suivants seront prélevés automatiquement dans les jours suivants.' 
                            : 'The next two installments will be automatically charged in the coming days.'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-nova-white">
                          {language === 'fr' 
                            ? `Un paiement de $${calculateTotalPrice()} confirmera votre réservation.` 
                            : `A payment of $${calculateTotalPrice()} will confirm your booking.`}
                        </p>
                      </>
                    )}
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
                          onClick={() => handleDepositPaymentMethodSelect(method.id)}
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
