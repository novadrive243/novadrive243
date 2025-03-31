
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Notification, NotificationType } from '@/components/notifications/notifications-center';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Bell, Plus, RefreshCw, Send } from 'lucide-react';

interface NotificationsManagerProps {
  language: string;
}

export const NotificationsManager = ({ language }: NotificationsManagerProps) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'system' as NotificationType
  });

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast({
        variant: "destructive",
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Veuillez remplir tous les champs requis" 
          : "Please fill in all required fields"
      });
      return;
    }

    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      ...newNotification,
      date: new Date().toISOString(),
      read: false
    };

    setNotifications([notification, ...notifications]);
    
    // Reset form
    setNewNotification({
      title: '',
      message: '',
      type: 'system'
    });

    toast({
      title: language === 'fr' ? "Notification créée" : "Notification created",
      description: language === 'fr' 
        ? "La notification a été créée avec succès" 
        : "The notification was successfully created"
    });
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: language === 'fr' ? "Notification supprimée" : "Notification deleted",
      description: language === 'fr' 
        ? "La notification a été supprimée" 
        : "The notification has been deleted"
    });
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: language === 'fr' ? "Notifications mises à jour" : "Notifications updated",
      description: language === 'fr' 
        ? "Toutes les notifications ont été marquées comme lues" 
        : "All notifications have been marked as read"
    });
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    toast({
      title: language === 'fr' ? "Notifications supprimées" : "Notifications cleared",
      description: language === 'fr' 
        ? "Toutes les notifications ont été supprimées" 
        : "All notifications have been cleared"
    });
  };

  const handleSendToAll = () => {
    toast({
      title: language === 'fr' ? "Fonctionnalité à venir" : "Coming soon",
      description: language === 'fr' 
        ? "L'envoi de notifications à tous les utilisateurs sera disponible prochainement" 
        : "Sending notifications to all users will be available soon"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-nova-white">
          {language === 'fr' ? "Gestion des notifications" : "Notifications Management"}
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={!notifications.some(n => !n.read)}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {language === 'fr' ? "Marquer tout comme lu" : "Mark all as read"}
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleDeleteAll}
            disabled={notifications.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {language === 'fr' ? "Supprimer tout" : "Delete all"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'fr' ? "Créer une notification" : "Create notification"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">{language === 'fr' ? "Titre" : "Title"}</Label>
              <Input 
                id="title" 
                value={newNotification.title}
                onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message">{language === 'fr' ? "Message" : "Message"}</Label>
              <Input 
                id="message" 
                value={newNotification.message}
                onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">{language === 'fr' ? "Type" : "Type"}</Label>
              <Select 
                value={newNotification.type}
                onValueChange={(value) => setNewNotification({...newNotification, type: value as NotificationType})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder={language === 'fr' ? "Sélectionner un type" : "Select a type"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">{language === 'fr' ? "Système" : "System"}</SelectItem>
                  <SelectItem value="booking">{language === 'fr' ? "Réservation" : "Booking"}</SelectItem>
                  <SelectItem value="promotion">{language === 'fr' ? "Promotion" : "Promotion"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button onClick={handleCreateNotification}>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'fr' ? "Créer" : "Create"}
              </Button>
              <Button onClick={handleSendToAll} variant="secondary">
                <Send className="h-4 w-4 mr-2" />
                {language === 'fr' ? "Envoyer à tous" : "Send to all"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'fr' ? "Liste des notifications" : "Notifications list"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">{language === 'fr' ? "Toutes" : "All"}</TabsTrigger>
              <TabsTrigger value="unread">{language === 'fr' ? "Non lues" : "Unread"}</TabsTrigger>
              <TabsTrigger value="system">{language === 'fr' ? "Système" : "System"}</TabsTrigger>
              <TabsTrigger value="booking">{language === 'fr' ? "Réservation" : "Booking"}</TabsTrigger>
              <TabsTrigger value="promotion">{language === 'fr' ? "Promotion" : "Promotion"}</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[400px] w-full pr-4">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border ${!notification.read ? 'bg-muted/10 border-nova-gold/20' : 'border-border'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-nova-gold" />
                            <h3 className="font-medium">{notification.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{new Date(notification.date).toLocaleString()}</p>
                          <div className="mt-2">
                            <Badge variant="outline" className="mr-2">
                              {notification.type}
                            </Badge>
                            {!notification.read && (
                              <Badge className="bg-red-500/90">
                                {language === 'fr' ? "Non lu" : "Unread"}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              {language === 'fr' ? "Marquer comme lu" : "Mark as read"}
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <Bell className="h-8 w-8 mb-2 text-muted-foreground/50" />
                  <p>{language === 'fr' ? "Aucune notification" : "No notifications"}</p>
                </div>
              )}
            </ScrollArea>
          </TabsList>
        </CardContent>
      </Card>
    </div>
  );
};
