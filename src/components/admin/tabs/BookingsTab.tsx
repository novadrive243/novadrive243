
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingsTable } from '@/components/admin/BookingsTable';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw } from 'lucide-react';
import { AddBookingDialog } from '@/components/admin/dialogs/AddBookingDialog';
import { NotificationsCenter } from '@/components/notifications/notifications-center';

interface BookingsTabProps {
  bookings: any[];
  language: string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  refreshData?: () => void;
}

export const BookingsTab = ({
  bookings,
  language,
  formatDate,
  formatCurrency,
  refreshData
}: BookingsTabProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleRefresh = () => {
    if (refreshData) {
      refreshData();
    }
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>
              {language === 'fr' ? 'Réservations' : 'Bookings'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' 
                ? bookings.length > 0 
                  ? 'Gérer les réservations et les réservations des clients' 
                  : 'Aucune réservation disponible. Commencez à ajouter des réservations.'
                : bookings.length > 0 
                  ? 'Manage customer bookings and reservations' 
                  : 'No bookings available. Start adding bookings.'}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10 hover:text-nova-white"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Actualiser' : 'Refresh'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10 hover:text-nova-white"
              onClick={openAddDialog}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Ajouter' : 'Add'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <BookingsTable 
            bookings={bookings}
            language={language}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
            onAddBooking={openAddDialog}
          />
        </CardContent>
      </Card>

      <AddBookingDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        refreshData={handleRefresh}
        language={language}
      />
    </>
  );
};
