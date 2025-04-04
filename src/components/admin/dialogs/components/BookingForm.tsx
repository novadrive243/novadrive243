
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserSearchField } from './UserSearchField';
import { VehicleSelector } from './VehicleSelector';
import { DateRangePicker } from './DateRangePicker';
import { PriceEstimate } from './PriceEstimate';
import { DialogFooter } from '@/components/ui/dialog';

interface BookingFormProps {
  userName: string;
  setUserName: (name: string) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  vehicleId: string;
  setVehicleId: (id: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  loading: boolean;
  language: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  userName,
  setUserName,
  userId,
  setUserId,
  vehicleId,
  setVehicleId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  loading,
  language,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 text-nova-white">
      {/* User search field */}
      <UserSearchField 
        userName={userName}
        setUserName={setUserName}
        userId={userId}
        setUserId={setUserId}
        language={language}
      />
      
      {/* Vehicle selector */}
      <VehicleSelector 
        vehicleId={vehicleId}
        setVehicleId={setVehicleId}
        language={language}
      />
      
      {/* Date range picker */}
      <DateRangePicker 
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        language={language}
      />
      
      {/* Price estimate */}
      {vehicleId && startDate && endDate && (
        <PriceEstimate 
          vehicleId={vehicleId}
          startDate={startDate}
          endDate={endDate}
          language={language}
        />
      )}
      
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10"
          disabled={loading}
        >
          {language === 'fr' ? 'Annuler' : 'Cancel'}
        </Button>
        <Button 
          type="submit"
          className="bg-nova-gold text-nova-black hover:bg-nova-gold/90"
          disabled={loading}
        >
          {loading ? 
            (language === 'fr' ? 'Création...' : 'Creating...') : 
            (language === 'fr' ? 'Créer' : 'Create')
          }
        </Button>
      </DialogFooter>
    </form>
  );
};
