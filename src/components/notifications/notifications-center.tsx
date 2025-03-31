
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type NotificationType = 'booking' | 'promotion' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteAll: () => void;
}

export function NotificationsCenter({ 
  notifications
}: NotificationsCenterProps) {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="h-8 w-8 relative">
        <Bell className="h-5 w-5 text-nova-gold" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs"
            variant="destructive"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}
