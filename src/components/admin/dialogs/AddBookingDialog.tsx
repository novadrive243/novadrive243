
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { vehicles } from '@/data/vehicles';
import { calculateVehiclePrice } from '@/components/booking/utils/booking-utils';
import { toast } from 'sonner';

interface AddBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  language: string;
}

export const AddBookingDialog = ({ isOpen, onClose, refreshData, language }: AddBookingDialogProps) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState<{id: string, full_name: string}[]>([]);
  const [searchingUsers, setSearchingUsers] = useState(false);

  // Reset form when dialog is opened
  useEffect(() => {
    if (isOpen) {
      setUserName('');
      setUserId(null);
      setVehicleId('');
      setStartDate(new Date());
      setEndDate(new Date(new Date().setDate(new Date().getDate() + 3)));
      setUserOptions([]);
    }
  }, [isOpen]);

  // Fonction pour chercher des utilisateurs
  const searchUsers = async (query: string) => {
    if (query.length < 2) return;
    
    setSearchingUsers(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .ilike('full_name', `%${query}%`)
        .limit(5);
        
      if (error) throw error;
      setUserOptions(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearchingUsers(false);
    }
  };

  // Calculer le prix total en fonction des dates et du véhicule sélectionné
  const calculateTotalPrice = () => {
    if (!vehicleId || !startDate || !endDate) return 0;
    
    const selectedVehicle = vehicles.find(v => v.id === vehicleId);
    if (!selectedVehicle) return 0;
    
    const daysDiff = Math.max(1, Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ));
    
    return calculateVehiclePrice(
      selectedVehicle,
      'daily',
      daysDiff,
      daysDiff
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Vérifier que tous les champs requis sont remplis
      if (!userId || !vehicleId || !startDate || !endDate) {
        toast.error(language === 'fr' 
          ? 'Veuillez remplir tous les champs requis' 
          : 'Please fill in all required fields');
        setLoading(false);
        return;
      }
      
      // Calculer le prix total
      const totalPrice = calculateTotalPrice();
      
      // Créer la réservation dans Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: userId,
          vehicle_id: vehicleId,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          total_price: totalPrice,
          status: 'pending'
        })
        .select();
        
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Afficher une notification de succès
      toast.success(language === 'fr' 
        ? 'Réservation créée avec succès' 
        : 'Booking created successfully');
      
      // Fermer le dialogue et rafraîchir les données
      onClose();
      refreshData();
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error(language === 'fr' 
        ? 'Erreur lors de la création de la réservation' 
        : 'Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-nova-gray border-nova-gold/30">
        <DialogHeader>
          <DialogTitle className="text-nova-white">
            {language === 'fr' ? 'Ajouter une réservation' : 'Add Booking'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-nova-white">
          {/* Champ de recherche d'utilisateur */}
          <div className="space-y-2">
            <Label htmlFor="user">
              {language === 'fr' ? 'Client' : 'Customer'}
            </Label>
            <Input
              id="user"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                searchUsers(e.target.value);
              }}
              className="bg-nova-black/50 border-nova-gold/30 text-nova-white"
              placeholder={language === 'fr' ? 'Rechercher un client...' : 'Search for a customer...'}
            />
            {userOptions.length > 0 && (
              <div className="bg-nova-black border border-nova-gold/30 rounded-md p-2 max-h-40 overflow-y-auto">
                {userOptions.map((user) => (
                  <div 
                    key={user.id}
                    className="p-2 hover:bg-nova-gray/50 cursor-pointer rounded"
                    onClick={() => {
                      setUserId(user.id);
                      setUserName(user.full_name);
                      setUserOptions([]);
                    }}
                  >
                    {user.full_name}
                  </div>
                ))}
              </div>
            )}
            {searchingUsers && (
              <div className="text-nova-gold/70 text-sm">
                {language === 'fr' ? 'Recherche en cours...' : 'Searching...'}
              </div>
            )}
          </div>
          
          {/* Sélection du véhicule */}
          <div className="space-y-2">
            <Label htmlFor="vehicle">
              {language === 'fr' ? 'Véhicule' : 'Vehicle'}
            </Label>
            <Select value={vehicleId} onValueChange={setVehicleId}>
              <SelectTrigger className="bg-nova-black/50 border-nova-gold/30 text-nova-white">
                <SelectValue placeholder={language === 'fr' ? 'Sélectionner un véhicule' : 'Select a vehicle'} />
              </SelectTrigger>
              <SelectContent className="bg-nova-gray border-nova-gold/30">
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id} className="text-nova-white hover:bg-nova-gold/20">
                    {vehicle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date de début */}
          <div className="space-y-2">
            <Label>
              {language === 'fr' ? 'Date de début' : 'Start Date'}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-nova-black/50 border-nova-gold/30 text-nova-white justify-between"
                  type="button"
                >
                  {startDate ? format(startDate, 'PPP', { locale: language === 'fr' ? fr : undefined }) : 
                  language === 'fr' ? 'Sélectionner une date' : 'Select a date'}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-nova-gray border-nova-gold/30">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className="text-nova-white"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Date de fin */}
          <div className="space-y-2">
            <Label>
              {language === 'fr' ? 'Date de fin' : 'End Date'}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-nova-black/50 border-nova-gold/30 text-nova-white justify-between"
                  type="button"
                >
                  {endDate ? format(endDate, 'PPP', { locale: language === 'fr' ? fr : undefined }) : 
                  language === 'fr' ? 'Sélectionner une date' : 'Select a date'}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-nova-gray border-nova-gold/30">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className="text-nova-white"
                  disabled={(date) => date < (startDate || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Prix estimé */}
          {vehicleId && startDate && endDate && (
            <div className="py-2 border-t border-nova-gold/20">
              <div className="flex justify-between items-center">
                <span>
                  {language === 'fr' ? 'Prix total estimé:' : 'Estimated total price:'}
                </span>
                <span className="font-semibold text-nova-gold">
                  ${calculateTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
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
      </DialogContent>
    </Dialog>
  );
};
