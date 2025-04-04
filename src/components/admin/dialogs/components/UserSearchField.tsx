
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { searchUsers } from '../utils/booking-dialog-utils';

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
  const [userOptions, setUserOptions] = useState<{id: string, full_name: string}[]>([]);
  const [searchingUsers, setSearchingUsers] = useState(false);
  
  const handleSearch = async (query: string) => {
    setUserName(query);
    setSearchingUsers(true);
    const results = await searchUsers(query);
    setUserOptions(results);
    setSearchingUsers(false);
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="user">
        {language === 'fr' ? 'Client' : 'Customer'}
      </Label>
      <Input
        id="user"
        value={userName}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-nova-black/50 border-nova-gold/30 text-nova-white"
        placeholder={language === 'fr' ? 'Rechercher un client...' : 'Search for a customer...'}
      />
      {userOptions.length > 0 && (
        <div className="bg-nova-black border border-nova-gold/30 rounded-md p-2 max-h-40 overflow-y-auto">
          {userOptions.map((user) => (
            <div 
              key={user.id}
              className="p-2 hover:bg-nova-gray/50 cursor-pointer rounded"
              onClick={() => {
                setUserId(user.id);
                setUserName(user.full_name);
                setUserOptions([]);
              }}
            >
              {user.full_name}
            </div>
          ))}
        </div>
      )}
      {searchingUsers && (
        <div className="text-nova-gold/70 text-sm">
          {language === 'fr' ? 'Recherche en cours...' : 'Searching...'}
        </div>
      )}
    </div>
  );
};
