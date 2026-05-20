import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { AppError } from '../../../domain/errors/AppError';

export class AccountUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async upgradeAccount(email: string, password?: string): Promise<any> {
    try {
      return await this.authRepo.updateUser({ email, password });
    } catch (err) {
      throw AppError.fromError(err);
    }
  }

  async updatePassword(password: string): Promise<any> {
    try {
      return await this.authRepo.updateUser({ password });
    } catch (err) {
      throw AppError.fromError(err);
    }
  }
}

