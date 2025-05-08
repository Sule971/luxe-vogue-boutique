
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  checkPasswordStrength: (password: string) => PasswordStrength;
  generatePassword: () => string;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('luxeUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
      }
    }
  }, []);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<void> => {
    // For UI demo purposes only - mock login
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
        };
        
        setUser(mockUser);
        localStorage.setItem('luxeUser', JSON.stringify(mockUser));
        toast.success('Login successful');
        resolve();
      }, 800);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // For UI demo purposes only - mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: Date.now().toString(),
          email,
          name,
        };
        
        setUser(mockUser);
        localStorage.setItem('luxeUser', JSON.stringify(mockUser));
        toast.success('Registration successful');
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxeUser');
    toast.info('You have been logged out');
  };

  // Password strength checker
  const checkPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return 'weak';
    
    // Simple strength criteria
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    
    const criteria = [hasNumber, hasSpecial, hasUpperCase, hasLowerCase];
    const metCriteria = criteria.filter(Boolean).length;
    
    if (password.length < 8 || metCriteria < 2) return 'weak';
    if (password.length < 12 || metCriteria < 3) return 'medium';
    return 'strong';
  };

  // Password generator
  const generatePassword = (): string => {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+{}:"<>?|[];,./';

    const allChars = lowerChars + upperChars + numbers + specialChars;
    const length = 16;

    let password = '';
    
    // Ensure at least one of each type
    password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
    password += upperChars[Math.floor(Math.random() * upperChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    checkPasswordStrength,
    generatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
