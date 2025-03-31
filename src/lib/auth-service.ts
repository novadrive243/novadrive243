
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth';

/**
 * Checks if the current user session is active and returns session data
 */
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error checking session:', error);
    throw error;
  }
};

/**
 * Creates a user from session data
 */
export const createUserFromSession = (sessionUser: any): User | null => {
  if (!sessionUser) return null;
  
  const { id, email } = sessionUser;
  // Determine if user is admin (quick check based on email for demo)
  const isAdmin = email === 'admin@novadrive.com';
  
  return {
    id,
    email: email || '',
    role: isAdmin ? 'admin' : 'user'
  };
};

/**
 * Signs in a user with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Signs up a new user
 */
export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Signs out the current user
 */
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Resets a user's password via email
 */
export const resetUserPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

/**
 * Set up a listener for auth state changes
 */
export const subscribeToAuthChanges = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};
