
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { searchUsers } from '../utils/booking-dialog-utils';

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

  const handleSearch = async (query: string) => {
    setUserName(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
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
    setUserId(result.id);
    setSearchResults([]);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="userName">
        {language === 'fr' ? 'Client' : 'Customer'}
      </Label>
      
      <div className="relative">
        <Input
          id="userName"
          value={userName}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={language === 'fr' ? 'Rechercher un client...' : 'Search for a customer...'}
          className="bg-nova-gray-dark border-nova-gold/20 text-nova-white"
          autoComplete="off"
        />
        
        {/* Search results dropdown */}
        {isSearching && (
          <div className="absolute inset-x-0 top-full mt-1 py-1 bg-nova-gray-dark rounded-md shadow-lg z-10">
            <div className="px-3 py-2 text-sm text-nova-white/70">
              {language === 'fr' ? 'Recherche...' : 'Searching...'}
            </div>
          </div>
        )}
        
        {!isSearching && searchResults.length > 0 && (
          <div className="absolute inset-x-0 top-full mt-1 py-1 bg-nova-gray-dark rounded-md shadow-lg z-10">
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
      </div>
      
      {userId && (
        <div className="text-xs text-nova-gold">
          {language === 'fr' ? 'Client sélectionné' : 'Customer selected'}
        </div>
      )}
    </div>
  );
};
