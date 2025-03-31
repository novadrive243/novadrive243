
// Define the User type
export type User = {
  id: string;
  email: string;
  role?: 'user' | 'admin';
};

// Define the context type
export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};
