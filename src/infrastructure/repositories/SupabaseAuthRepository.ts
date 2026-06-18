/**
 * Supabase implementation of the Auth Repository.
 * This lives in the Infrastructure Layer. It handles the specific
 * implementation details of interacting with Supabase Auth.
 */
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { supabase } from '../../services/supabase';

export class SupabaseAuthRepository implements IAuthRepository {
  async signInWithEmail(email: string, password: string): Promise<any> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }

  async signUp(email: string, password: string): Promise<any> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  }

  async resetPassword(email: string): Promise<void> {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const baseRedirect = window.location.origin + (isGitHubPages ? '/magical-products/' : '/');
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: baseRedirect
    });
    if (error) throw error;
  }

  async signInWithOAuth(provider: 'google' | 'github' | 'facebook'): Promise<any> {
    const baseRedirect = window.location.origin + '/magical-products/';
    
    // Determine provider-specific scopes to ensure email & profile info are retrieved successfully
    let scopes: string | undefined = undefined;
    if (provider === 'github') {
      scopes = 'read:user user:email';
    } else if (provider === 'google') {
      scopes = 'email profile';
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { 
        redirectTo: baseRedirect,
        ...(scopes ? { scopes } : {})
      }
    });
    if (error) throw error;
    return data;
  }

  async signInAnonymously(): Promise<any> {
    // If an anonymous session is already alive (e.g. the user clicked "Sign Out"
    // but we preserved the session to keep the same user_id), reuse it instead of
    // creating a brand-new anonymous user which would orphan the old order history.
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.is_anonymous) {
      return session.user; // already authenticated as the same guest — return user
    }

    // No existing anonymous session: create a fresh one.
    // Note: Supabase Anonymous Auth must be enabled in the project dashboard.
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error("Guest Login Error:", error);
      throw new Error("Guest mode is currently unavailable. Please create an account.");
    }
    return data.user;
  }
 
  async getSession(): Promise<any> {
    return await supabase.auth.getSession();
  }

  async updateLastActivity(userId: string): Promise<void> {
    const { error } = await supabase
      .from('anonymous_user_activity')
      .upsert({ 
        user_id: userId, 
        last_active_at: new Date().toISOString() 
      }, { onConflict: 'user_id' });
      
    if (error) {
      console.warn("AuthRepository: Failed to update last activity", error);
    }
  }

  async updateUser(attributes: { email?: string; password?: string }): Promise<any> {
    const { data, error } = await supabase.auth.updateUser(attributes);
    if (error) throw error;
    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  onAuthStateChange(callback: (event: string, session: any) => void): { unsubscribe: () => void } {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
    return { unsubscribe: () => subscription.unsubscribe() };
  }
}


// Singleton instance
export const supabaseAuthRepository = new SupabaseAuthRepository();
