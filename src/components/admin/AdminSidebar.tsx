
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

  return (
    <div className={`h-full bg-nova-black border-r border-nova-gold/20 overflow-y-auto transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
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
