import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback, useMemo } from 'react';
import { useDependencies } from './DependenciesContext';
import { useAdmin } from './AdminContext';
import { useShipper } from './ShipperContext';
import { useOperator } from './OperatorContext';
import { useOwner } from './OwnerContext';

interface AuthContextType {
  user: any;
  isAdmin: boolean;
  isShipper: boolean;
  isOperator: boolean;
  isOwner: boolean;
  isAuthLoading: boolean;
  isCheckingRoles: boolean;
  checkAdminStatus: () => Promise<boolean>;
  checkShipperStatus: () => Promise<boolean>;
  checkOperatorStatus: () => Promise<boolean>;
  checkOwnerStatus: () => Promise<boolean>;
  signOut: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { authRepository, orderRepository } = useDependencies();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isCheckingRoles, setIsCheckingRoles] = useState(false);
  const { isAdmin, checkAdminStatus, clearAdminStatus } = useAdmin();
  const { isShipper, checkShipperStatus, clearShipperStatus } = useShipper();
  const { isOperator, checkOperatorStatus, clearOperatorStatus } = useOperator();
  const { isOwner, checkOwnerStatus, clearOwnerStatus } = useOwner();

  useEffect(() => {
    // Initial session check
    authRepository.getSession().then(({ data }) => {
      setUser(data?.user ?? null);
      setIsAuthLoading(false);
    });

    // Listen for auth changes via repository
    const { unsubscribe } = authRepository.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? session; // Handle variations in session object
      setUser(currentUser);

      if ((event === 'USER_UPDATED' || event === 'SIGNED_IN') && currentUser && !currentUser.is_anonymous) {
        // Upgrade guest orders
        const userId = currentUser.id || currentUser.$id;
        if (userId) {
          orderRepository.upgradeGuestOrders(userId).catch(err => {
            console.error("AuthContext: Failed to upgrade guest orders:", err);
          });
        }
      }

      if (event === 'SIGNED_OUT') {
        setUser(null);
      }

      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const lastCheckedUserId = useRef<string | null>(null);

  useEffect(() => {
    const checkRoles = async () => {
      const currentUserId = user?.id || user?.$id || null;
      if (user) {
        if (lastCheckedUserId.current === currentUserId) return;
        setIsCheckingRoles(true);
        try {
          await Promise.all([
            checkAdminStatus(),
            checkShipperStatus(),
            checkOperatorStatus(),
            checkOwnerStatus()
          ]);
          lastCheckedUserId.current = currentUserId;
        } finally {
          setIsCheckingRoles(false);
        }
      } else {
        lastCheckedUserId.current = null;
        clearAdminStatus();
        clearShipperStatus();
        clearOperatorStatus();
        clearOwnerStatus();
        setIsCheckingRoles(false);
      }
    };

    checkRoles();
  }, [user, checkAdminStatus, checkShipperStatus, checkOperatorStatus, checkOwnerStatus, clearAdminStatus, clearShipperStatus, clearOperatorStatus, clearOwnerStatus]);

  const signOut = async () => {
    await authRepository.signOut();
    setUser(null);
  };

  const signInAnonymously = async () => {
    setIsAuthLoading(true);
    try {
      const user = await authRepository.signInAnonymously();
      setUser(user);
    } catch (err) {
      console.error("AuthContext: Anonymous sign-in failed", err);
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    await authRepository.updateUser({ password });
  };

  const value = useMemo(() => ({
    user,
    isAdmin,
    isShipper,
    isOperator,
    isOwner,
    isAuthLoading,
    isCheckingRoles,
    checkAdminStatus,
    checkShipperStatus,
    checkOperatorStatus,
    checkOwnerStatus,
    signOut,
    signInAnonymously,
    updatePassword
  }), [
    user, isAdmin, isShipper, isOperator, isOwner, isAuthLoading, isCheckingRoles,
    checkAdminStatus, checkShipperStatus, checkOperatorStatus, checkOwnerStatus, signOut, signInAnonymously, updatePassword
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
