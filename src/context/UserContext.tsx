// src/context/UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import type{ Pet } from '../data/petData';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
}

interface CareReminder {
  id: string;
  petId: string;
  petName: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate: string;
  completed: boolean;
}

interface UserNote {
  id: string;
  petId: string;
  petName: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  // User
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Favorites
  favorites: Pet[];
  addFavorite: (pet: Pet) => void;
  removeFavorite: (petId: string) => void;
  isFavorite: (petId: string) => boolean;
  
  // Reminders
  reminders: CareReminder[];
  addReminder: (reminder: Omit<CareReminder, 'id' | 'completed'>) => void;
  updateReminder: (id: string, updates: Partial<CareReminder>) => void;
  deleteReminder: (id: string) => void;
  completeReminder: (id: string) => void;
  
  // Notes
  notes: UserNote[];
  addNote: (note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  getNotesForPet: (petId: string) => UserNote[];
  
  // Loading states
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Demo user for testing
const DEMO_USER: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@petpedia.com',
  avatar: 'https://i.pravatar.cc/150?u=1',
  joinDate: new Date().toISOString()
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Pet[]>([]);
  const [reminders, setReminders] = useState<CareReminder[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        // Load user session
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        // Load favorites
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }

        // Load reminders
        const savedReminders = localStorage.getItem('reminders');
        if (savedReminders) {
          setReminders(JSON.parse(savedReminders));
        }

        // Load notes
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Demo login - accept any credentials
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setUser(DEMO_USER);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Demo registration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        joinDate: new Date().toISOString()
      };
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setReminders([]);
    setNotes([]);
    localStorage.removeItem('user');
    // Keep favorites, reminders, notes? Or clear them? We'll keep them for next login
  };

  // Favorites functions
  const addFavorite = (pet: Pet) => {
    if (!favorites.some(f => f.id === pet.id)) {
      setFavorites([...favorites, pet]);
    }
  };

  const removeFavorite = (petId: string) => {
    setFavorites(favorites.filter(p => p.id !== petId));
  };

  const isFavorite = (petId: string) => {
    return favorites.some(p => p.id === petId);
  };

  // Reminders functions
  const addReminder = (reminder: Omit<CareReminder, 'id' | 'completed'>) => {
    const newReminder: CareReminder = {
      ...reminder,
      id: Date.now().toString(),
      completed: false
    };
    setReminders([...reminders, newReminder]);
  };

  const updateReminder = (id: string, updates: Partial<CareReminder>) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, ...updates } : r
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const completeReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  // Notes functions
  const addNote = (note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newNote: UserNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, content: string) => {
    setNotes(notes.map(n => 
      n.id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const getNotesForPet = (petId: string) => {
    return notes.filter(n => n.petId === petId);
  };

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      
      reminders,
      addReminder,
      updateReminder,
      deleteReminder,
      completeReminder,
      
      notes,
      addNote,
      updateNote,
      deleteNote,
      getNotesForPet,
      
      loading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};