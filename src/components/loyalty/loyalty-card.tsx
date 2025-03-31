
import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

interface LoyaltyCardProps {
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  nextLevelPoints: number;
  history?: {
    date: string;
    description: string;
    points: number;
  }[];
  onPointsReset?: () => void;
}

export function LoyaltyCard({ points, level, nextLevelPoints, history = [], onPointsReset }: LoyaltyCardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Calculate progress towards next level
  const progress = Math.min(Math.round((points / nextLevelPoints) * 100), 100);
  
  // Badge color based on level
  const getLevelColor = () => {
    switch(level) {
      case 'bronze': return 'bg-amber-800';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-nova-gold';
      case 'platinum': return 'bg-blue-300';
      default: return 'bg-amber-800';
    }
  };

  const handleResetPoints = async () => {
    // In a real application, this would call an API to reset points
    // For now, we'll just show a toast message and call the callback if provided
    try {
      // This is a placeholder for the actual API call to reset points
      // In a complete implementation, this would update the database
      
      toast({
        title: t('loyalty.pointsReset'),
        description: t('loyalty.pointsResetDescription'),
      });
      
      // Call the callback if provided (to update UI state)
      if (onPointsReset) {
        onPointsReset();
      }
    } catch (error) {
      console.error('Error resetting points:', error);
      toast({
        title: t('loyalty.resetError'),
        description: t('loyalty.resetErrorDescription'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="bg-nova-black/40 border-nova-gold/20 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-nova-white">{t('loyalty.title')}</CardTitle>
          <div className={`px-3 py-1 rounded-full text-xs font-medium text-nova-black ${getLevelColor()}`}>
            {t(`loyalty.${level}`)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        <div className="flex justify-between mb-2">
          <span className="text-nova-white/70">{t('loyalty.points')}</span>
          <span className="text-nova-white font-bold">{points}</span>
        </div>
        
        <div className="mb-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs">
            <span className="text-nova-white/70">{points} {t('loyalty.points')}</span>
            <span className="text-nova-gold">{nextLevelPoints} {t('loyalty.nextLevel')}</span>
          </div>
        </div>
        
        {history.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-nova-white mb-2">{t('loyalty.history')}</h4>
            <div className="space-y-2">
              {history.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded bg-nova-black/30">
                  <div>
                    <p className="text-sm text-nova-white">{item.description}</p>
                    <p className="text-xs text-nova-white/50">{item.date}</p>
                  </div>
                  <div className="flex items-center text-nova-gold">
                    <Star className="h-3 w-3 mr-1" />
                    <span className="text-sm">+{item.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-nova-gold/30 text-nova-gold hover:bg-nova-gold/10"
            onClick={handleResetPoints}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {t('loyalty.resetPoints')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
