
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DateRangePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  language: string;
}

export const DateRangePicker = ({ 
  startDate, 
  endDate, 
  setStartDate, 
  setEndDate,
  language 
}: DateRangePickerProps) => {
  return (
    <>
      {/* Start Date */}
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
      
      {/* End Date */}
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
    </>
  );
};
