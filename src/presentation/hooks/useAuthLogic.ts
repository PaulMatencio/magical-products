/**
 * Custom hook for Auth Logic.
 * This lives in the Presentation Layer (Interface Adapters).
 * It delegates actions to Application Use Cases and manages UI state.
 */
import { useState, FormEvent } from 'react';
import { AuthMode } from '../../application/use-cases/auth/AuthenticateUseCase';
import { useDependencies } from '../../context/DependenciesContext';

export function useAuthLogic(onAuthenticated: (user?: any) => void) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { authenticateUseCase: authUseCase } = useDependencies();

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await authUseCase.execute(mode, email, password);
      
      if (mode === "reset") {
        setSuccess("Password reset link sent! Please check your email. IMPORTANT: For the link to work, please click the 'Open in new tab' button in the top right of the app preview before clicking the link in your email.");
      } else if (mode === "register") {
        alert("Registration successful! Please check your email for verification if enabled, or you can now sign in.");
        setMode("login");
      } else {
        onAuthenticated(result);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    setSocialLoading(provider);
    setError(null);
    try {
      await authUseCase.socialLogin(provider);
    } catch (err: any) {
      setError(`Social login failed: ${err.message}. Note: You may need to open the app in a new tab for social logins to work correctly in the preview.`);
      setSocialLoading(null);
    }
  };

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    setError(null);
    try {
      const user = await authUseCase.guestLogin();
      onAuthenticated(user);
    } catch (err: any) {
      setError(err.message || "Failed to enter as guest");
    } finally {
      setGuestLoading(false);
    }
  };

  return {
    mode, setMode,
    email, setEmail,
    password, setPassword,
    loading, socialLoading, guestLoading,
    error, setError,
    success, setSuccess,
    handleEmailAuth, handleSocialLogin, handleGuestLogin
  };
}

