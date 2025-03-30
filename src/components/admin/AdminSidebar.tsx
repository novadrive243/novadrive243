
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
  // Admin menu items grouped by category
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
      className={`fixed left-0 bg-[#1A1F2C] border-r border-[#9b87f5]/20 overflow-y-auto z-20 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={{ 
        top: '5rem', // Fixed position below header
        bottom: 0,
        height: 'calc(100vh - 5rem)' // Exact height calculation
      }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#9b87f5]/20">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-[#9b87f5] mb-4">
              {language === 'fr' ? 'Administration' : 'Admin Panel'}
            </h2>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full bg-[#9b87f5]/10 text-[#9b87f5] hover:bg-[#9b87f5]/20 transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-3">
          {menuGroups.map((group) => (
            <div key={group.id} className="mb-6">
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
                        "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                        activeTab === item.id
                          ? "bg-[#9b87f5]/20 text-white"
                          : "text-[#F1F1F1] hover:bg-[#9b87f5]/10"
                      )}
                      title={collapsed ? item.title : undefined}
                      aria-label={item.title}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 text-[#9b87f5]",
                        collapsed ? "mx-auto" : "mr-3"
                      )} />
                      {!collapsed && <span>{item.title}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="p-4 mt-auto border-t border-[#9b87f5]/20">
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
