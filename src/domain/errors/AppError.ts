export type ErrorCode = 
  | 'AUTH_FAILED' 
  | 'VALIDATION_ERROR' 
  | 'NOT_FOUND' 
  | 'UNAUTHORIZED' 
  | 'NETWORK_ERROR' 
  | 'UNKNOWN_ERROR';

export class AppError extends Error {
  constructor(
    public message: string,
    public code: ErrorCode = 'UNKNOWN_ERROR',
    public originalError?: any
  ) {
    super(message);
    this.name = 'AppError';
  }

  static fromError(err: any): AppError {
    if (err instanceof AppError) return err;
    
    // Handle Supabase errors or other common errors
    let code: ErrorCode = 'UNKNOWN_ERROR';
    let message = err.message || 'An unexpected error occurred';

    if (err.status === 401 || err.code === 'PGRST301') {
      code = 'UNAUTHORIZED';
      message = 'You are not authorized to perform this action.';
    } else if (err.code === '23505') {
      code = 'VALIDATION_ERROR';
      message = 'This item already exists.';
    }

    return new AppError(message, code, err);
  }
}
