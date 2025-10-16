import { api } from '@/lib/api';
import { AppError } from '@/lib/errors';
import { User } from '@/types/user';

export const userService = {
  createUser: async (user: User): Promise<User[]> => {
    try {
      const users = await api.post<User[]>(`/auth/register`, user);
      return users;
    } catch (error) {
      // Re-throw AppError instances and safeguard
      if (AppError.isAppError(error)) {
        throw error;
      }
      // Handle unexpected errors
      throw new AppError('Failed to fetch hotels', 500, 'HOTEL_FETCH_ERROR');
    }
  },
};
