
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingsTableProps {
  bookings: any[];
  language: string;
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  onAddBooking?: () => void;
}

export const BookingsTable = ({ 
  bookings, 
  language, 
  formatDate, 
  formatCurrency,
  onAddBooking
}: BookingsTableProps) => {
  return (
    <Card className="bg-nova-gray/30 border-nova-gold/30">
      <CardHeader>
        <CardTitle className="text-nova-white">
          {language === 'fr' ? 'Réservations Récentes' : 'Recent Bookings'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <Table>
            <TableHeader className="border-b border-nova-gold/30">
              <TableRow>
                <TableHead className="text-nova-gold">ID</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Client' : 'Customer'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Véhicule' : 'Vehicle'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Date de début' : 'Start Date'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Date de fin' : 'End Date'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Statut' : 'Status'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Montant' : 'Amount'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                  <TableCell className="text-nova-white font-mono text-xs">{booking.id.split('-')[0]}</TableCell>
                  <TableCell className="text-nova-white">{booking.user?.full_name || 'Unknown'}</TableCell>
                  <TableCell className="text-nova-white">{booking.vehicle?.name || 'Unknown'}</TableCell>
                  <TableCell className="text-nova-white">{formatDate(booking.start_date)}</TableCell>
                  <TableCell className="text-nova-white">{formatDate(booking.end_date)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                      booking.status === 'active' ? 'bg-blue-500/20 text-blue-500' :
                      booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-nova-white">{formatCurrency(Number(booking.total_price))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-8 flex flex-col items-center justify-center">
            <div className="text-nova-white/70 mb-6">
              {language === 'fr' 
                ? 'Aucune réservation pour le moment.' 
                : 'No bookings available yet.'}
            </div>
            {onAddBooking && (
              <Button 
                variant="outline" 
                className="border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10 hover:text-nova-white"
                onClick={() => {
                  console.log("Add booking button clicked in table");
                  onAddBooking();
                }}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Ajouter une réservation' : 'Add Booking'}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
