
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DurationSelectorProps {
  durationType: 'hourly' | 'daily' | 'monthly';
  duration: number;
  setDuration: (value: number) => void;
  days: number;
  setDays: (value: number) => void;
  months: number;
  setMonths: (value: number) => void;
  hourOptions?: number[];
  dayOptions?: number[];
  monthOptions?: number[];
}

export function DurationSelector({
  durationType,
  duration,
  setDuration,
  days,
  setDays,
  months,
  setMonths,
  hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 12, 24],
  dayOptions,
  monthOptions
}: DurationSelectorProps) {
  // If dayOptions not provided, generate all 31 days
  const allDayOptions = dayOptions || Array.from({ length: 31 }, (_, i) => i + 1);
  
  // If monthOptions not provided, generate all 12 months
  const allMonthOptions = monthOptions || Array.from({ length: 12 }, (_, i) => i + 1);
  
  if (durationType === 'hourly') {
    return (
      <div>
        <Label htmlFor="duration">Hours</Label>
        <Select
          value={duration.toString()}
          onValueChange={(value) => setDuration(parseInt(value))}
        >
          <SelectTrigger className="w-full bg-nova-gray/30 border-nova-gold/30 text-nova-white">
            <SelectValue placeholder="Select hours" />
          </SelectTrigger>
          <SelectContent className="bg-nova-gray border-nova-gold/30 text-nova-white">
            <ScrollArea className="h-60">
              <SelectGroup>
                {hourOptions.map((hour) => (
                  <SelectItem key={hour} value={hour.toString()} className="text-nova-white hover:bg-nova-gold/20">
                    {hour} {hour === 1 ? 'hour' : 'hours'}
                  </SelectItem>
                ))}
              </SelectGroup>
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
    );
  }
  
  if (durationType === 'daily') {
    return (
      <div>
        <Label htmlFor="days">Days</Label>
        <Select
          value={days.toString()}
          onValueChange={(value) => setDays(parseInt(value))}
        >
          <SelectTrigger className="w-full bg-nova-gray/30 border-nova-gold/30 text-nova-white">
            <SelectValue placeholder="Select days" />
          </SelectTrigger>
          <SelectContent className="bg-nova-gray border-nova-gold/30 text-nova-white">
            <ScrollArea className="h-60">
              <SelectGroup>
                {allDayOptions.map((day) => (
                  <SelectItem key={day} value={day.toString()} className="text-nova-white hover:bg-nova-gold/20">
                    {day} {day === 1 ? 'day' : 'days'}
                  </SelectItem>
                ))}
              </SelectGroup>
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
    );
  }
  
  return (
    <div>
      <Label htmlFor="months">Months</Label>
      <Select
        value={months.toString()}
        onValueChange={(value) => setMonths(parseInt(value))}
      >
        <SelectTrigger className="w-full bg-nova-gray/30 border-nova-gold/30 text-nova-white">
          <SelectValue placeholder="Select months" />
        </SelectTrigger>
        <SelectContent className="bg-nova-gray border-nova-gold/30 text-nova-white">
          <ScrollArea className="h-60">
            <SelectGroup>
              {allMonthOptions.map((month) => (
                <SelectItem key={month} value={month.toString()} className="text-nova-white hover:bg-nova-gold/20">
                  {month} {month === 1 ? 'month' : 'months'}
                </SelectItem>
              ))}
            </SelectGroup>
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
}
