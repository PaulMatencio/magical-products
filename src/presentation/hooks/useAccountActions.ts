import { useState, FormEvent, useMemo, useCallback } from 'react';

import { validatePassword } from '../../utils';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { authRepository } from '../../infrastructure/repositories';
import { AccountUseCase } from '../../application/use-cases/auth/AccountUseCase';

export function useAccountActions() {
  const { user, signOut: authSignOut } = useAuth();
  const { cart, setCart, emptyCart, saveForLater, isSigningOutRef } = useCart();
  const { navigateTo } = useNavigation();

  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [showUpgradePassword, setShowUpgradePassword] = useState(false);
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);

  const accountUseCase = useMemo(() => new AccountUseCase(authRepository), []);

  const handleSignOut = useCallback(async (guestLandingRef: React.MutableRefObject<boolean>) => {
    if (user?.is_anonymous) {
      if (cart.length > 0) {
        try {
          await emptyCart();
        } catch (err) {
          console.warn("AccountActions: Failed to return guest inventory on sign-out", err);
        }
      }

      if (guestLandingRef.current) {
        await authSignOut();
        guestLandingRef.current = false;
        return;
      }

      guestLandingRef.current = true;
      isSigningOutRef.current = true;
      setCart([]);
      navigateTo('landing');
      return;
    }

    isSigningOutRef.current = true;
    if (!saveForLater) {
      localStorage.removeItem('product_cart');
    }

    await authSignOut();
    setCart([]);
    navigateTo('landing');
  }, [user, cart.length, emptyCart, authSignOut, isSigningOutRef, setCart, navigateTo, saveForLater]);

  const handleUpgrade = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const validationError = validatePassword(password);
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsUpgrading(true);
    try {
      await accountUseCase.upgradeAccount(email, password);
      alert("Account upgraded successfully! Please verify your email if required.");
    } catch (err: any) {
      alert("Failed to upgrade: " + err.message);
    } finally {
      setIsUpgrading(false);
    }
  }, [accountUseCase]);

  const handleUpdatePassword = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validatePassword(newPassword);
    if (validationError) {
      alert(validationError);
      return;
    }
    setIsUpdatingPassword(true);
    try {
      await accountUseCase.updatePassword(newPassword);
      alert("Password updated successfully!");
      setIsRecovering(false);
      setNewPassword("");
      navigateTo("store");
    } catch (err: any) {
      alert("Failed to update password: " + err.message);
    } finally {
      setIsUpdatingPassword(false);
    }
  }, [newPassword, accountUseCase, navigateTo]);


  return useMemo(() => ({
    isUpgrading,
    isRecovering,
    setIsRecovering,
    newPassword,
    setNewPassword,
    isUpdatingPassword,
    showUpgradePassword,
    setShowUpgradePassword,
    showRecoveryPassword,
    setShowRecoveryPassword,
    handleSignOut,
    handleUpgrade,
    handleUpdatePassword
  }), [
    isUpgrading, isRecovering, newPassword, isUpdatingPassword,
    showUpgradePassword, showRecoveryPassword, handleSignOut,
    handleUpgrade, handleUpdatePassword
  ]);
}


