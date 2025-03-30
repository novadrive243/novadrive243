
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ListTodo,
  Settings,
  Calendar,
  Users,
  BarChart3,
  Settings as Wrench,
  Users2,
  Tag
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
}

export const AdminSidebar = ({ activeTab, setActiveTab, language }: AdminSidebarProps) => {
  // Admin menu items
  const menuItems = [
    {
      id: "bookings",
      title: language === 'fr' ? 'Réservations' : 'Bookings',
      icon: ListTodo,
    },
    {
      id: "vehicles",
      title: language === 'fr' ? 'Véhicules' : 'Vehicles',
      icon: Settings,
    },
    {
      id: "calendar",
      title: language === 'fr' ? 'Calendrier' : 'Calendar',
      icon: Calendar,
    },
    {
      id: "customers",
      title: language === 'fr' ? 'Clients' : 'Customers',
      icon: Users,
    },
    {
      id: "analytics",
      title: language === 'fr' ? 'Analyses' : 'Analytics',
      icon: BarChart3,
    },
    {
      id: "maintenance",
      title: language === 'fr' ? 'Maintenance' : 'Maintenance',
      icon: Wrench,
    },
    {
      id: "staff",
      title: language === 'fr' ? 'Personnel' : 'Staff',
      icon: Users2,
    },
    {
      id: "promotions",
      title: language === 'fr' ? 'Promotions' : 'Promotions',
      icon: Tag,
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{language === 'fr' ? 'Administration' : 'Admin Panel'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
