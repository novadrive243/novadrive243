
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Bookmark, Gift, Info, Check, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteAll
}: NotificationsCenterProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  const getIconForType = (type: NotificationType) => {
    switch(type) {
      case 'booking': return <Bookmark className="h-5 w-5 text-blue-400" />;
      case 'promotion': return <Gift className="h-5 w-5 text-purple-400" />;
      case 'system': return <Info className="h-5 w-5 text-green-400" />;
      default: return <Bell className="h-5 w-5 text-nova-gold" />;
    }
  };
  
  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
    toast({
      title: t('notifications.markAsRead'),
      description: "All notifications have been marked as read.",
    });
  };
  
  const handleDeleteAll = () => {
    onDeleteAll();
    toast({
      title: t('notifications.deleteAll'),
      description: "All notifications have been deleted.",
    });
  };
  
  return (
    <Card className="bg-nova-black/40 border-nova-gold/20 w-full max-w-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <CardTitle className="text-nova-white">{t('notifications.title')}</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="h-8 w-8"
            title={t('notifications.markAsRead')}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDeleteAll}
            disabled={notifications.length === 0}
            className="h-8 w-8"
            title={t('notifications.deleteAll')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'unread')}>
          <TabsList className="w-full bg-nova-black/60">
            <TabsTrigger value="all" className="flex-1">
              {t('notifications.all')}
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              {t('notifications.unread')} {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <NotificationsList 
              notifications={filteredNotifications} 
              onMarkAsRead={onMarkAsRead} 
              getIconForType={getIconForType}
            />
          </TabsContent>
          
          <TabsContent value="unread" className="m-0">
            <NotificationsList 
              notifications={filteredNotifications} 
              onMarkAsRead={onMarkAsRead} 
              getIconForType={getIconForType}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  getIconForType: (type: NotificationType) => React.ReactNode;
}

function NotificationsList({ notifications, onMarkAsRead, getIconForType }: NotificationsListProps) {
  const { t } = useLanguage();
  
  if (notifications.length === 0) {
    return (
      <div className="py-8 text-center text-nova-white/50">
        <Bell className="mx-auto h-8 w-8 mb-2 opacity-30" />
        <p>No notifications</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-nova-gold/10 max-h-96 overflow-y-auto">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`p-4 hover:bg-nova-black/20 transition-colors ${!notification.read ? 'bg-nova-gold/5' : ''}`}
          onClick={() => !notification.read && onMarkAsRead(notification.id)}
        >
          <div className="flex gap-3">
            <div className="mt-1">
              {getIconForType(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-nova-white">{notification.title}</h4>
                <span className="text-xs text-nova-white/50">{notification.date}</span>
              </div>
              <p className="text-sm text-nova-white/70 mt-1">{notification.message}</p>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {t(`notifications.${notification.type}`)}
                </Badge>
                {!notification.read && (
                  <Badge variant="secondary" className="ml-2 text-xs bg-nova-gold/20 text-nova-gold">
                    New
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
