import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USER = {
  email: 'test@gmail.com',
  password: '123456',
  name: 'Test User'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check dummy user credentials
      if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
        const userData = { email: DUMMY_USER.email, name: DUMMY_USER.name };
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }

      // Check registered users
      const registeredUsers = await AsyncStorage.getItem('registeredUsers');
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers);
        const foundUser = users.find((u: any) => u.email === email && u.password === password);
        if (foundUser) {
          const userData = { email: foundUser.email, name: foundUser.name };
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const registeredUsers = await AsyncStorage.getItem('registeredUsers');
      let users = registeredUsers ? JSON.parse(registeredUsers) : [];
      
      // Check if email already exists
      if (users.find((u: any) => u.email === email) || email === DUMMY_USER.email) {
        return false; // User already exists
      }

      // Add new user
      const newUser = { name, email, password };
      users.push(newUser);
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(users));

      // Auto login after registration
      const userData = { email, name };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
