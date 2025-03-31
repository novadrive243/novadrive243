
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogOut, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  language: string;
}

export const AdminHeader = ({ language }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: language === 'fr' ? 'Déconnexion réussie' : 'Logout Successful',
      description: language === 'fr' ? 'Vous avez été déconnecté' : 'You have been logged out',
    });
    navigate('/login');
  };

  const resetAdminPin = () => {
    const generatePin = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    
    const newPin = generatePin();
    localStorage.setItem('adminPin', newPin);
    
    toast({
      title: language === 'fr' ? 'PIN réinitialisé' : 'PIN Reset',
      description: language === 'fr' 
        ? `Votre nouveau PIN admin est: ${newPin}` 
        : `Your new admin PIN is: ${newPin}`,
      duration: 6000,
    });
  };

  return (
    <div className="flex justify-between items-center mb-6 mt-4">
      <h1 className="text-xl sm:text-2xl font-bold text-nova-white">
        {language === 'fr' ? 'Tableau de Bord Admin' : 'Admin Dashboard'}
      </h1>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
          onClick={resetAdminPin}
        >
          <KeyRound className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Réinitialiser PIN' : 'Reset PIN'}
        </Button>
        <Button 
          variant="outline" 
          className="border-nova-gold/50 text-nova-gold hover:bg-nova-gold/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Déconnexion' : 'Logout'}
        </Button>
      </div>
    </div>
  );
};
