
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

interface CustomersTableProps {
  profiles: any[];
  language: string;
  formatDate: (dateString: string) => string;
}

export const CustomersTable = ({ profiles, language, formatDate }: CustomersTableProps) => {
  return (
    <Card className="bg-nova-gray/30 border-nova-gold/30">
      <CardHeader>
        <CardTitle className="text-nova-white">
          {language === 'fr' ? 'Gestion des Clients' : 'Customer Management'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {profiles.length > 0 ? (
          <Table>
            <TableHeader className="border-b border-nova-gold/30">
              <TableRow>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Nom complet' : 'Full Name'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Téléphone' : 'Phone'}</TableHead>
                <TableHead className="text-nova-gold">{language === 'fr' ? 'Date d\'inscription' : 'Registration Date'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id} className="border-b border-nova-gold/10 hover:bg-nova-gold/5">
                  <TableCell className="text-nova-white">{profile.full_name || 'No name'}</TableCell>
                  <TableCell className="text-nova-white">{profile.phone || 'No phone'}</TableCell>
                  <TableCell className="text-nova-white">{formatDate(profile.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-8 text-nova-white/70">
            {language === 'fr' ? 'Aucun client trouvé' : 'No customers found'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
