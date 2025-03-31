
import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
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
  // Empty menu groups - all items have been removed
  const menuGroups = [];

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
          {/* Menu groups have been removed */}
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
