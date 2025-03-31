
import React, { useState } from 'react';
import { AdminLogin } from './login/admin-login';
import { UserLogin } from './login/user-login';

export function LoginForm() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  
  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
  };

  return (
    <>
      {isAdminLogin ? (
        <AdminLogin onToggleMode={toggleAdminLogin} />
      ) : (
        <UserLogin onToggleMode={toggleAdminLogin} />
      )}
    </>
  );
}
