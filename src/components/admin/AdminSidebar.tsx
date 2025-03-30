
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
  ChevronRight,
  Car,
  ClipboardList,
  Wrench,
  BadgePercent
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  // Admin menu items grouped by category with clear section headers
  const menuGroups = [
    {
      id: "operations",
      title: language === 'fr' ? 'Opérations' : 'Operations',
      items: [
        {
          id: "bookings",
          title: language === 'fr' ? 'Réservations' : 'Bookings',
          icon: ClipboardList,
        },
        {
          id: "calendar",
          title: language === 'fr' ? 'Calendrier' : 'Calendar',
          icon: Calendar,
        },
      ]
    },
    {
      id: "inventory",
      title: language === 'fr' ? 'Inventaire' : 'Inventory',
      items: [
        {
          id: "vehicles",
          title: language === 'fr' ? 'Véhicules' : 'Vehicles',
          icon: Car,
        },
        {
          id: "maintenance",
          title: language === 'fr' ? 'Maintenance' : 'Maintenance',
          icon: Wrench,
        },
      ]
    },
    {
      id: "customers",
      title: language === 'fr' ? 'Clients' : 'Customers',
      items: [
        {
          id: "customers",
          title: language === 'fr' ? 'Clients' : 'Customers',
          icon: Users,
        },
        {
          id: "promotions",
          title: language === 'fr' ? 'Promotions' : 'Promotions',
          icon: BadgePercent,
        },
      ]
    },
    {
      id: "business",
      title: language === 'fr' ? 'Entreprise' : 'Business',
      items: [
        {
          id: "analytics",
          title: language === 'fr' ? 'Analyses' : 'Analytics',
          icon: BarChart3,
        },
        {
          id: "staff",
          title: language === 'fr' ? 'Personnel' : 'Staff',
          icon: Users2,
        },
      ]
    }
  ];

  return (
    <aside 
      className="fixed left-0 top-20 bottom-0 bg-[#1A1F2C] border-r border-nova-gold/20 h-[calc(100vh-5rem)] z-20 transition-all duration-300 overflow-hidden"
      style={{ width: collapsed ? '64px' : '256px' }}
    >
      <div className="flex flex-col h-full">
        {/* Header section */}
        <div className="p-4 border-b border-nova-gold/20">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-nova-gold mb-4">
              {language === 'fr' ? 'Administration' : 'Admin Panel'}
            </h2>
          )}
          
          <button
            onClick={toggleSidebar}
            className={`${collapsed ? 'mx-auto' : 'ml-auto'} flex items-center justify-center p-2 rounded-md bg-nova-gold/10 text-nova-gold hover:bg-nova-gold/20 transition-colors`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {/* Navigation menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuGroups.map((group) => (
            <div key={group.id} className={`mb-6 ${collapsed ? 'px-2' : 'px-4'}`}>
              {!collapsed && (
                <h3 className="text-xs uppercase tracking-wider text-[#8E9196] font-medium mb-3 px-2">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center rounded-md transition-colors",
                        collapsed ? "p-2 justify-center" : "px-3 py-2",
                        activeTab === item.id
                          ? "bg-[#6E59A5] text-white"
                          : "text-[#F1F1F1] hover:bg-[#7E69AB]/20"
                      )}
                      title={collapsed ? item.title : undefined}
                      aria-label={item.title}
                    >
                      <item.icon className={cn(
                        "flex-shrink-0",
                        collapsed ? "h-5 w-5" : "h-4 w-4 mr-3",
                        activeTab === item.id ? "text-white" : "text-[#9b87f5]"
                      )} />
                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        
        {/* Footer with version info */}
        <div className="p-4 mt-auto border-t border-[#9b87f5]/20 bg-[#1A1F2C]/80">
          {!collapsed && (
            <div className="text-xs text-[#8E9196] text-center">
              NovaDrive Admin v1.0
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
