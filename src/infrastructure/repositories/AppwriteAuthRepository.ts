import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { account, client } from '../../services/appwrite';
import appConfig from '../../config/appConfig';
import { ID, OAuthProvider } from 'appwrite';

export class AppwriteAuthRepository implements IAuthRepository {
  private databaseId = appConfig.appwrite.databaseId;
  private authListeners: ((event: string, session: any) => void)[] = [];

  private notifyListeners(event: string, session: any) {
    this.authListeners.forEach(cb => cb(event, session));
  }

  async signInWithEmail(email: string, password: string): Promise<any> {
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    this.notifyListeners('SIGNED_IN', session);
    return user;
  }

  async signUp(email: string, password: string): Promise<any> {
    await account.create(ID.unique(), email, password);
    const user = await this.signInWithEmail(email, password);
    this.notifyListeners('SIGNED_UP', null);
    return user;
  }

  async resetPassword(email: string): Promise<void> {
    await account.createRecovery(email, window.location.origin);
  }

  async signInWithOAuth(provider: 'google' | 'github' | 'facebook'): Promise<any> {
    const baseRedirect = window.location.origin + '/magical-products/';
    return await account.createOAuth2Session(
      provider as OAuthProvider,
      baseRedirect,
      baseRedirect
    );
  }

  async signInAnonymously(): Promise<any> {
    try {
      const user = await account.get();
      if (user.labels?.includes('anonymous')) {
        return user;
      }
    } catch (e) {}

    await account.createAnonymousSession();
    const user = await account.get();
    this.notifyListeners('SIGNED_IN', null);
    return user;
  }

  async getSession(): Promise<any> {
    try {
      const session = await account.getSession('current');
      const user = await account.get();
      return { data: { session, user }, error: null };
    } catch (error) {
      return { data: { session: null, user: null }, error };
    }
  }

  async updateLastActivity(userId: string): Promise<void> {
    console.log('AppwriteAuthRepository: updateLastActivity not implemented');
  }

  async updateUser(attributes: { email?: string; password?: string }): Promise<any> {
    if (attributes.password) {
      await account.updatePassword(attributes.password);
    }
    const user = await account.get();
    this.notifyListeners('USER_UPDATED', user);
    return user;
  }

  async signOut(): Promise<void> {
    await account.deleteSession('current');
    this.notifyListeners('SIGNED_OUT', null);
  }

  onAuthStateChange(callback: (event: string, session: any) => void): { unsubscribe: () => void } {
    this.authListeners.push(callback);
    return {
      unsubscribe: () => {
        this.authListeners = this.authListeners.filter(cb => cb !== callback);
      }
    };
  }
}

export const appwriteAuthRepository = new AppwriteAuthRepository();
