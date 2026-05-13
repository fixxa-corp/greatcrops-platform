import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';

export type UserRole = 'admin' | 'client';

export interface AuthUser {
  username: string;
  role: UserRole;
  clientId?: string; // for client role
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string, portal: 'admin' | 'client') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem('gc_auth');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('gc_auth', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('gc_auth');
    }
  }, [user]);

  const login = (username: string, password: string, portal: 'admin' | 'client'): boolean => {
    if (portal === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        setUser({ username: 'admin', role: 'admin', name: 'Tomas Aguayo' });
        return true;
      }
      return false;
    }

    // Client login — accept any client email with password 'demo'
    if (portal === 'client' && password === 'demo') {
      // Map emails to client IDs
      const clientMap: Record<string, { id: string; name: string }> = {
        'roberto@mendozaranch.com': { id: 'cl-1', name: 'Roberto Mendoza' },
        'sarah@pacificridge.com': { id: 'cl-2', name: 'Sarah Chen' },
        'miguel@torresvineyard.com': { id: 'cl-3', name: 'Miguel Torres' },
        'linda@nakamuracitrus.com': { id: 'cl-4', name: 'Linda Nakamura' },
        'james@whitfieldavo.com': { id: 'cl-5', name: 'James Whitfield' },
        'patricia@alvarezorganic.com': { id: 'cl-6', name: 'Patricia Alvarez' },
        'david@centralcoastalmonds.com': { id: 'cl-7', name: 'David Kim' },
        'maria@gonzalesgroves.com': { id: 'cl-8', name: 'Maria Gonzales' },
        'tom@richardsonranch.com': { id: 'cl-9', name: 'Tom Richardson' },
        'elena@vargasvalley.com': { id: 'cl-10', name: 'Elena Vargas' },
      };

      const client = clientMap[username.toLowerCase()];
      if (client) {
        setUser({ username, role: 'client', clientId: client.id, name: client.name });
        return true;
      }
      return false;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Protected route wrapper
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, role }: { children: ReactNode; role: UserRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={role === 'admin' ? '/admin' : '/portal'} replace />;
  }

  if (user.role !== role) {
    return <Navigate to={role === 'admin' ? '/admin' : '/portal'} replace />;
  }

  return <>{children}</>;
}
