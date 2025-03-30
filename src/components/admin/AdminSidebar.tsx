
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { 
  ListTodo, 
  Settings, 
  Calendar, 
  Users, 
  BarChart3, 
  Wrench, 
  Users2, 
  Tag 
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

export const AdminSidebar = ({ activeTab, onTabChange, language }: AdminSidebarProps) => {
  const menuItems = [
    {
      id: 'bookings',
      label: language === 'fr' ? 'Réservations' : 'Bookings',
      icon: ListTodo,
    },
    {
      id: 'vehicles',
      label: language === 'fr' ? 'Véhicules' : 'Vehicles',
      icon: Settings,
    },
    {
      id: 'calendar',
      label: language === 'fr' ? 'Calendrier' : 'Calendar',
      icon: Calendar,
    },
    {
      id: 'customers',
      label: language === 'fr' ? 'Clients' : 'Customers',
      icon: Users,
    },
    {
      id: 'analytics',
      label: language === 'fr' ? 'Analyses' : 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'maintenance',
      label: language === 'fr' ? 'Maintenance' : 'Maintenance',
      icon: Wrench,
    },
    {
      id: 'staff',
      label: language === 'fr' ? 'Personnel' : 'Staff',
      icon: Users2,
    },
    {
      id: 'promotions',
      label: language === 'fr' ? 'Promotions' : 'Promotions',
      icon: Tag,
    },
  ];

  return (
    <Sidebar variant="inset" className="border-r border-nova-gold/20">
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton 
                isActive={activeTab === item.id}
                onClick={() => onTabChange(item.id)}
                tooltip={item.label}
              >
                <item.icon className="mr-2" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
