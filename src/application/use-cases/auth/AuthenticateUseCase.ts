import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { validatePassword } from '../../../utils';
import { AppError } from '../../../domain/errors/AppError';

export type AuthMode = 'login' | 'register' | 'reset';

export class AuthenticateUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(mode: AuthMode, email: string, password?: string): Promise<any> {
    try {
      if (mode === 'reset') {
        await this.authRepo.resetPassword(email);
        return { message: 'Reset link sent' };
      }

      if (!password) {
        throw new AppError('Password is required for login/registration', 'VALIDATION_ERROR');
      }

      if (mode === 'login') {
        return await this.authRepo.signInWithEmail(email, password);
      } else {
        const validationError = validatePassword(password);
        if (validationError) {
          throw new AppError(validationError, 'VALIDATION_ERROR');
        }

        await this.authRepo.signUp(email, password);
        return { message: 'Registration successful' };
      }
    } catch (err) {
      throw AppError.fromError(err);
    }
  }

  async socialLogin(provider: 'google' | 'github' | 'facebook'): Promise<void> {
    try {
      await this.authRepo.signInWithOAuth(provider);
    } catch (err) {
      throw AppError.fromError(err);
    }
  }

  async guestLogin(): Promise<any> {
    try {
      return await this.authRepo.signInAnonymously();
    } catch (err) {
      throw AppError.fromError(err);
    }
  }
}

