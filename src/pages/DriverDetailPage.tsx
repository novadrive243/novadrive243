
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/language-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DriverDetailCard } from '@/components/drivers/driver-detail-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Driver } from '@/types/drivers';
import { useToast } from '@/hooks/use-toast';
import { BackButton } from '@/components/ui/back-button';

const DriverDetailPage = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDriver = async () => {
      if (!driverId) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('drivers')
          .select('*')
          .eq('id', driverId)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Cast the data to the Driver type and add mock data for fields not in DB yet
          const driverData = data as unknown as Driver;
          setDriver({
            ...driverData,
            // Add mock data for fields that are not in the database yet
            bio: language === 'fr' 
              ? `Chauffeur professionnel avec ${driverData.experience} d'expérience, spécialisé dans la conduite de véhicules de luxe.`
              : `Professional driver with ${driverData.experience} of experience, specialized in driving luxury vehicles.`,
            availability: language === 'fr' ? 'Disponible 7j/7, 24h/24' : 'Available 24/7',
            location: 'Paris, France',
            specialties: ['VIP', 'Events', 'Airport']
          });
        }
      } catch (error) {
        console.error('Error fetching driver:', error);
        toast({
          title: language === 'fr' ? 'Erreur' : 'Error',
          description: language === 'fr' 
            ? 'Impossible de charger les détails du chauffeur. Veuillez réessayer.' 
            : 'Failed to load driver details. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDriver();
  }, [driverId, language, toast]);

  const handleContactClick = (driverId: string) => {
    console.log(`Contact driver ${driverId}`);
    toast({
      title: language === 'fr' ? 'Contact' : 'Contact',
      description: language === 'fr' 
        ? 'Vous allez être contacté par notre service client.' 
        : 'You will be contacted by our customer service.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-nova-white">
      <Header />
      
      <main className="flex-grow py-24 px-4 relative">
        <BackButton />
        
        <div className="container mx-auto">
          <Button 
            variant="outline" 
            className="mb-6 border-nova-gold/20 text-nova-white hover:bg-nova-gold/10"
            onClick={() => navigate('/drivers')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'fr' ? 'Retour aux chauffeurs' : 'Back to drivers'}
          </Button>
          
          {loading ? (
            <div className="flex justify-center my-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nova-gold"></div>
            </div>
          ) : driver ? (
            <DriverDetailCard 
              driver={driver} 
              onContactClick={handleContactClick} 
            />
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-nova-white mb-4">
                {language === 'fr' ? 'Chauffeur non trouvé' : 'Driver not found'}
              </h2>
              <p className="text-nova-white/70 mb-8">
                {language === 'fr' 
                  ? 'Le chauffeur que vous recherchez n\'existe pas ou a été supprimé.' 
                  : 'The driver you are looking for does not exist or has been removed.'}
              </p>
              <Button
                className="bg-nova-gold text-nova-black hover:bg-nova-gold/90"
                onClick={() => navigate('/drivers')}
              >
                {language === 'fr' ? 'Voir tous les chauffeurs' : 'View all drivers'}
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DriverDetailPage;
