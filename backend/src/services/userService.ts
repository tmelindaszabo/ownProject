import IRegistrationRequest from '../models/IRegistrationRequest';
import { userRepository } from '../repository/userRepository';

export const userService = {
  async register(registerUser: IRegistrationRequest): Promise<number> {
    const user = await userRepository.getUserByUsername(registerUser.username);
    if (user) {
      return Promise.reject({
        status: 400,
        message: 'Username is alredy taken.',
      });
    }
    return await userRepository.registerNewUser(registerUser);
  },
};
