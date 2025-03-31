
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { driversData } from '@/data/drivers-data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminDriversPage = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const seedDatabase = async () => {
    try {
      setLoading(true);
      
      // First check if data already exists
      const { count, error: countError } = await supabase
        .from('drivers')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        throw countError;
      }
      
      if (count && count > 0) {
        toast({
          title: 'Data already exists',
          description: 'The drivers database already contains data. Seeding skipped.',
          duration: 3000,
        });
        return;
      }
      
      // Insert driver data
      const { error } = await supabase
        .from('drivers')
        .insert(driversData);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Database seeded',
        description: 'The drivers data has been successfully added to the database.',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error seeding database:', error);
      toast({
        title: 'Error',
        description: 'Failed to seed database. Please check console for details.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin: Manage Drivers</h1>
      
      <div className="bg-nova-black/40 border border-nova-gold/20 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-nova-white">Database Operations</h2>
        <p className="mb-4 text-nova-white/80">
          This page allows you to seed the database with initial drivers data.
          Use this only once to initialize your database.
        </p>
        <Button 
          onClick={seedDatabase}
          disabled={loading}
          className="bg-nova-gold text-nova-black hover:bg-nova-gold/90"
        >
          {loading ? 'Loading...' : 'Seed Database with Drivers'}
        </Button>
      </div>
    </div>
  );
};

export default AdminDriversPage;
