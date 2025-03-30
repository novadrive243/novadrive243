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
  BadgePercent,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
  collapsed: boolean;
  toggleSidebar: () => void;
  visible: boolean;
}

export const AdminSidebar = ({ 
  activeTab, 
  setActiveTab, 
  language, 
  collapsed, 
  toggleSidebar,
  visible
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
        }
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
        {
          id: "ai-assistant",
          title: language === 'fr' ? 'Assistant IA' : 'AI Assistant',
          icon: Bot,
        },
      ]
    }
  ];

  return (
    <aside 
      className={`fixed bg-nova-black border-r border-nova-gold/20 overflow-y-auto z-20 transition-all duration-300 ${
        collapsed ? 'w-12' : 'w-52'
      } ${
        visible ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ 
        top: '5rem', // Fixed position below header
        left: 0, // Ensure it starts at the leftmost edge
        bottom: 0,
        height: 'calc(100vh - 5rem)' // Full height minus header height
      }}
    >
      <div className="flex flex-col h-full">
        <div className="p-2">
          {!collapsed && (
            <h2 className="text-sm font-semibold text-nova-gold mb-3">
              {language === 'fr' ? 'Administration' : 'Admin Panel'}
            </h2>
          )}
          
          <div className="flex justify-end mb-2">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full bg-nova-gold/10 text-nova-gold hover:bg-nova-gold/20 transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-1 py-1">
          {menuGroups.map((group) => (
            <div key={group.id} className="mb-3">
              {!collapsed && (
                <h3 className="text-xs uppercase tracking-wider text-nova-gold/70 font-medium mb-1 px-1">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center px-1.5 py-1 text-xs rounded-md transition-colors",
                        activeTab === item.id
                          ? "bg-nova-gold/20 text-nova-white"
                          : "text-nova-white/80 hover:bg-nova-gold/10"
                      )}
                      title={collapsed ? item.title : undefined}
                      aria-label={item.title}
                    >
                      <item.icon className={cn(
                        "h-3.5 w-3.5 text-nova-gold",
                        collapsed ? "mx-auto" : "mr-1.5"
                      )} />
                      {!collapsed && <span className="text-xs">{item.title}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="p-2 mt-auto border-t border-nova-gold/10">
          {!collapsed && (
            <div className="text-xs text-nova-white/50 text-center">
              NovaDrive Admin v1.0
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
