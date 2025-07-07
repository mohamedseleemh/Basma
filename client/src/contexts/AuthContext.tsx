import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  username: string;
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: any;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session from localStorage
    const savedSession = localStorage.getItem('auth_session');
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        setUser(parsedSession.user);
        setProfile(parsedSession.profile);
        setSession(parsedSession);
      } catch (e) {
        localStorage.removeItem('auth_session');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // For demo purposes, check for admin credentials
    if (email === 'admin@vib.com' && password === 'admin123') {
      const mockUser = {
        id: '1',
        email: 'admin@vib.com',
        username: 'admin',
      };
      const mockProfile = {
        id: '1',
        user_id: '1',
        full_name: 'Administrator',
        role: 'admin',
      };
      const mockSession = {
        user: mockUser,
        profile: mockProfile,
      };

      setUser(mockUser);
      setProfile(mockProfile);
      setSession(mockSession);
      localStorage.setItem('auth_session', JSON.stringify(mockSession));

      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحباً بك!',
      });

      return { error: null };
    } else {
      const error = { message: 'Invalid credentials' };
      toast({
        title: 'خطأ في تسجيل الدخول',
        description: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    toast({
      title: 'التسجيل غير متاح',
      description: 'يرجى التواصل مع الإدارة للحصول على حساب',
      variant: 'destructive',
    });
    return { error: { message: 'Registration not available' } };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    setSession(null);
    localStorage.removeItem('auth_session');

    toast({
      title: 'تم تسجيل الخروج',
      description: 'نراك قريباً!',
    });
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isAdmin,
        signIn,
        signUp,
        signOut,
      }}
    >
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
