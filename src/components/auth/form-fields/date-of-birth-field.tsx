
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateOfBirthFieldProps {
  form: UseFormReturn<any>;
}

export function DateOfBirthField({ form }: DateOfBirthFieldProps) {
  const { language } = useLanguage();
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(
    form.getValues().dateOfBirth || new Date()
  );
  
  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  
  // Month names
  const monthNames = {
    en: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    fr: [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
  };

  // Handle year change
  const handleYearChange = (year: string) => {
    const newDate = new Date(calendarMonth);
    newDate.setFullYear(parseInt(year));
    setCalendarMonth(newDate);
  };

  // Handle month change
  const handleMonthChange = (month: string) => {
    const newDate = new Date(calendarMonth);
    newDate.setMonth(parseInt(month));
    setCalendarMonth(newDate);
  };
  
  return (
    <FormField
      control={form.control}
      name="dateOfBirth"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-nova-white">
            {language === 'fr' ? 'Date de naissance' : 'Date of Birth'} *
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal bg-nova-black/60 border-nova-gold/30 text-nova-white",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP", { locale: language === 'fr' ? fr : undefined })
                  ) : (
                    <span>{language === 'fr' ? "Sélectionnez une date" : "Select date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-nova-black border-nova-gold/30" align="start">
              <div className="flex justify-between items-center p-3 border-b border-nova-gold/20">
                {/* Month Selector */}
                <Select
                  value={calendarMonth.getMonth().toString()}
                  onValueChange={handleMonthChange}
                >
                  <SelectTrigger className="w-[130px] bg-nova-black/70 border-nova-gold/30 text-nova-white">
                    <SelectValue placeholder={monthNames[language === 'fr' ? 'fr' : 'en'][calendarMonth.getMonth()]} />
                  </SelectTrigger>
                  <SelectContent className="bg-nova-black border-nova-gold/30 text-nova-white">
                    {monthNames[language === 'fr' ? 'fr' : 'en'].map((month, index) => (
                      <SelectItem 
                        key={index} 
                        value={index.toString()}
                        className="text-nova-white hover:bg-nova-gold/10"
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Year Selector */}
                <Select
                  value={calendarMonth.getFullYear().toString()}
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="w-[100px] bg-nova-black/70 border-nova-gold/30 text-nova-white">
                    <SelectValue placeholder={calendarMonth.getFullYear().toString()} />
                  </SelectTrigger>
                  <SelectContent className="bg-nova-black border-nova-gold/30 text-nova-white max-h-[200px]">
                    {years.map((year) => (
                      <SelectItem 
                        key={year} 
                        value={year.toString()}
                        className="text-nova-white hover:bg-nova-gold/10"
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                initialFocus
                className="bg-nova-black text-nova-white pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
