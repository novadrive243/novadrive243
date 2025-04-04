
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { searchUsers } from '../utils/booking-dialog-utils';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

interface UserSearchFieldProps {
  userName: string;
  setUserName: (name: string) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
  language: string;
}

export const UserSearchField = ({ userName, setUserName, userId, setUserId, language }: UserSearchFieldProps) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Initialize search input value with userName when it changes externally
  useEffect(() => {
    if (userName) {
      setSearchInputValue(userName);
    }
  }, [userName]);

  const handleSearch = async (query: string) => {
    setSearchInputValue(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    
    setIsSearching(true);
    setShowDropdown(true);
    
    try {
      const results = await searchUsers(query);
      console.log("Search results:", results);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectUser = (result: any) => {
    console.log("User selected:", result);
    setUserName(result.full_name);
    setSearchInputValue(result.full_name);
    setUserId(result.id);
    setSearchResults([]);
    setShowDropdown(false);
  };
  
  const handleInputBlur = () => {
    // Small delay to allow clicking on dropdown items
    setTimeout(() => setShowDropdown(false), 200);
  };
  
  const handleInputFocus = () => {
    if (searchInputValue.length >= 2) {
      setShowDropdown(true);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="userName" className="flex items-center">
        {language === 'fr' ? 'Client' : 'Customer'} 
        {userId && (
          <Badge className="ml-2 bg-nova-gold/20 text-nova-gold border-nova-gold/40">
            <User className="h-3 w-3 mr-1" />
            {language === 'fr' ? 'Sélectionné' : 'Selected'}
          </Badge>
        )}
      </Label>
      
      <div className="relative">
        <Input
          id="userName"
          value={searchInputValue}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder={language === 'fr' ? 'Rechercher un client...' : 'Search for a customer...'}
          className="bg-nova-gray-dark border-nova-gold/20 text-nova-white"
          autoComplete="off"
        />
        
        {/* Search results dropdown */}
        {showDropdown && (
          <>
            {isSearching && (
              <div className="absolute inset-x-0 top-full mt-1 py-1 bg-nova-gray-dark rounded-md shadow-lg z-10">
                <div className="px-3 py-2 text-sm text-nova-white/70">
                  {language === 'fr' ? 'Recherche...' : 'Searching...'}
                </div>
              </div>
            )}
            
            {!isSearching && searchResults.length > 0 && (
              <div className="absolute inset-x-0 top-full mt-1 py-1 bg-nova-gray-dark rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => selectUser(result)}
                    className="px-3 py-2 hover:bg-nova-gold/10 cursor-pointer text-nova-white"
                  >
                    {result.full_name}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {userId && (
        <div className="text-xs text-nova-gold flex items-center">
          <User className="h-3 w-3 mr-1" />
          {language === 'fr' ? 'Client sélectionné:' : 'Selected customer:'} {userName}
        </div>
      )}
    </div>
  );
};
