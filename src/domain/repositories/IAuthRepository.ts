/**
 * Interface for Authentication Repository.
 * This lives in the Domain Layer. It defines WHAT auth actions
 * our application can perform, but not HOW they are implemented.
 */
export interface IAuthRepository {
  signInWithEmail(email: string, password: string): Promise<any>;
  signUp(email: string, password: string): Promise<any>;
  resetPassword(email: string): Promise<void>;
  signInWithOAuth(provider: 'google' | 'github' | 'facebook'): Promise<any>;
  signInAnonymously(): Promise<any>;
  getSession(): Promise<any>;
  updateLastActivity(userId: string): Promise<void>;
  updateUser(attributes: { email?: string; password?: string }): Promise<any>;
  signOut(): Promise<void>;
  onAuthStateChange(callback: (event: string, session: any) => void): { unsubscribe: () => void };
}

