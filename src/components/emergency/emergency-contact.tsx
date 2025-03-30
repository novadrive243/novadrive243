
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Shield, AlertTriangle, Car } from 'lucide-react';

interface EmergencyContactProps {
  onCall: (number: string) => void;
  onMessage: (number: string) => void;
}

export function EmergencyContact({ onCall, onMessage }: EmergencyContactProps) {
  const { t } = useLanguage();
  
  const emergencyContacts = [
    {
      id: 'company',
      title: t('emergency.companySupport'),
      number: '+243 999 999 999',
      icon: <Shield className="h-6 w-6 text-nova-gold" />,
      primary: true
    },
    {
      id: 'police',
      title: t('emergency.police'),
      number: '112',
      icon: <AlertTriangle className="h-6 w-6 text-blue-500" />
    },
    {
      id: 'ambulance',
      title: t('emergency.ambulance'),
      number: '113',
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />
    },
    {
      id: 'roadside',
      title: t('emergency.roadside'),
      number: '+243 888 888 888',
      icon: <Car className="h-6 w-6 text-green-500" />
    }
  ];
  
  return (
    <Card className="bg-nova-black/40 border-nova-gold/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-nova-white flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          {t('emergency.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg overflow-hidden border border-nova-gold/10">
          {emergencyContacts.map((contact, index) => (
            <div 
              key={contact.id}
              className={`p-4 flex items-center justify-between ${
                contact.primary ? 'bg-nova-gold/10' : 'bg-nova-black/30'
              } ${
                index !== emergencyContacts.length - 1 ? 'border-b border-nova-gold/10' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {contact.icon}
                </div>
                <div>
                  <h4 className="font-medium text-nova-white">{contact.title}</h4>
                  <p className="text-sm text-nova-white/70">{contact.number}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
                  onClick={() => onMessage(contact.number)}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button 
                  variant={contact.primary ? "default" : "outline"}
                  size="sm" 
                  className={contact.primary 
                    ? "bg-red-500 hover:bg-red-600 text-white border-none" 
                    : "border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"}
                  onClick={() => onCall(contact.number)}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {t('emergency.call')}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-nova-white/50 mt-4 text-center">
          In case of emergency, please contact the appropriate service.
          Our company support is available 24/7.
        </p>
      </CardContent>
    </Card>
  );
}
