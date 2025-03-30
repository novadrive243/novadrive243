
import React from 'react';
import {
  ListTodo,
  Settings,
  Calendar,
  Users,
  BarChart3,
  Users2,
  Tag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const AdminSidebar = ({ 
  activeTab, 
  setActiveTab, 
  language, 
  collapsed, 
  toggleSidebar 
}: AdminSidebarProps) => {
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
      icon: Settings,
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

  // Custom styles for the sidebar
  const sidebarStyles = {
    position: 'fixed',
    top: '5rem',
    bottom: '12rem',
    left: 0,
    width: collapsed ? '4rem' : '16rem',
    background: '#0A0A0A',
    borderRight: '1px solid rgba(212, 175, 55, 0.2)',
    transition: 'width 0.3s ease',
    overflow: 'auto',
    zIndex: 10,
  } as React.CSSProperties;

  return (
    <div style={sidebarStyles}>
      <div className="p-4">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-nova-gold mb-6">
            {language === 'fr' ? 'Administration' : 'Admin Panel'}
          </h2>
        )}
        
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full bg-nova-gold/10 text-nova-gold hover:bg-nova-gold/20 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-nova-gold/20 text-nova-white'
                      : 'text-nova-white/80 hover:bg-nova-gold/10'
                  }`}
                  title={collapsed ? item.title : undefined}
                  aria-label={item.title}
                >
                  <item.icon className={`${collapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 text-nova-gold`} />
                  {!collapsed && <span>{item.title}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
