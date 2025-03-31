
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, ChevronDown, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { NotificationsCenter } from "@/components/notifications/notifications-center";
import { useAuth } from '@/hooks/use-auth';
import ContactChatDrawer from '@/components/contact/chat/ContactChatDrawer';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Empty notifications array
  const notifications = [];
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Main navigation items
  const navItems = [
    { title: t('header.home'), path: '/' },
    { title: t('header.about'), path: '/about' },
    { title: t('header.services'), path: '/services' },
    { title: t('header.book'), path: '/book' },
    { title: t('header.pricing'), path: '/pricing' },
    { title: t('header.contact'), path: '/contact' },
    { title: t('header.drivers'), path: '/drivers' },
  ];

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-nova-black text-nova-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="text-lg font-bold">
          NovaDrive
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-nova-gold focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Main Navigation */}
        <nav
          className={`md:flex space-x-6 ${
            isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-nova-black py-4 px-4 border-b border-nova-gold/20' : 'hidden'
          } md:relative md:w-auto`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-nova-gold transition-colors block md:inline-block"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <NotificationsCenter notifications={notifications} />

          {user ? (
            <div className="relative">
              <Button variant="secondary" className="gap-2 px-3" onClick={toggleUserMenu}>
                <User className="h-4 w-4" />
                {user.email}
                <ChevronDown className="h-4 w-4" />
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-nova-black border border-nova-gold/20 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-nova-white hover:bg-nova-gold/10 transition-colors"
                      role="menuitem"
                    >
                      {t('header.account')}
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-nova-white hover:bg-nova-gold/10 transition-colors"
                        role="menuitem"
                      >
                        {t('header.admin')}
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center px-4 py-2 text-sm text-nova-white hover:bg-nova-gold/10 transition-colors w-full text-left"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('header.signOut')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary">{t('header.login')}</Button>
              </Link>
              <Link to="/register">
                <Button>{t('header.register')}</Button>
              </Link>
            </>
          )}

          <ContactChatDrawer />
        </div>
      </div>
    </header>
  );
};
