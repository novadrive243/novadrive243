
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchUsers } from '../utils/booking-dialog-utils';
import { Check, User } from 'lucide-react';

interface UserSearchFieldProps {
  userName: string;
  setUserName: (name: string) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  language: string;
}

export const UserSearchField = ({ 
  userName, 
  setUserName, 
  userId, 
  setUserId, 
  language 
}: UserSearchFieldProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Initialize search query with userName if it exists
  useEffect(() => {
    if (userName && searchQuery === '') {
      setSearchQuery(userName);
    }
  }, [userName]);
  
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        const results = await searchUsers(searchQuery);
        console.log("Search results:", results);
        setSearchResults(results);
        setIsSearching(false);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);
    
    return () => clearTimeout(delaySearch);
  }, [searchQuery]);
  
  const handleSelectUser = (user: any) => {
    setUserId(user.id);
    setUserName(user.full_name);
    setSearchQuery(user.full_name);
    setShowResults(false);
  };
  
  const handleClearUser = () => {
    setUserId(null);
    setUserName('');
    setSearchQuery('');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear user selection if input changes
    if (userId) {
      setUserId(null);
    }
    
    // Update userName for test booking
    setUserName(value);
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="user">{language === 'fr' ? 'Utilisateur' : 'User'}</Label>
      
      <div className="relative">
        <Input
          id="user"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={language === 'fr' 
            ? "Rechercher un utilisateur..." 
            : "Search for a user..."}
          className="pr-10 bg-nova-gray/20 text-nova-white border-nova-gold/30"
        />
        
        {userId && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 text-nova-gold"
            onClick={handleClearUser}
          >
            <Check className="w-4 h-4 mr-1" />
            {language === 'fr' ? 'Sélectionné' : 'Selected'}
          </Button>
        )}
        
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-nova-gray border border-nova-gold/30 rounded-md shadow-lg max-h-60 overflow-auto">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="px-4 py-2 cursor-pointer hover:bg-nova-gold/10 flex items-center"
                onClick={() => handleSelectUser(user)}
              >
                <User className="w-4 h-4 mr-2 text-nova-gold" />
                <span className="text-nova-white">{user.full_name}</span>
              </div>
            ))}
          </div>
        )}
        
        {showResults && searchResults.length === 0 && !isSearching && (
          <div className="absolute z-10 w-full mt-1 bg-nova-gray border border-nova-gold/30 rounded-md shadow-lg p-3 text-center text-nova-white/70">
            {language === 'fr' 
              ? "Aucun utilisateur trouvé. Vous pouvez créer une réservation test." 
              : "No users found. You can create a test booking."}
          </div>
        )}
      </div>
      
      {userId === null && searchQuery && (
        <div className="text-sm text-nova-gold/80">
          {language === 'fr' 
            ? "Utilisateur test: " + searchQuery 
            : "Test user: " + searchQuery}
        </div>
      )}
    </div>
  );
};
