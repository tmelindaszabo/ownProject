import { ILoginRequest } from '../models/ILoginRequest';
import IRegistrationRequest from '../models/IRegistrationRequest';
import IRegistrationResultDataModel from '../models/IRegistrationResultDataModel';
import { userRepository } from '../repository/userRepository';

export const userService = {
  async register(registerUser: IRegistrationRequest): Promise<number> {
    const user = await userRepository.getUserByUsername(registerUser.username);
    if (user.length > 0) {
      return Promise.reject({
        status: 400,
        message: 'Username is alredy taken.',
      });
    }
    return await userRepository.registerNewUser(registerUser);
  },

  async login(loginUser: ILoginRequest): Promise<IRegistrationResultDataModel> {
    const user = await userRepository.getUserByUsername(loginUser.username);
    if (user.length === 0) {
      return Promise.reject({
        status: 400,
        message: 'Username or password is incorrect.',
      });
    }
    const isPasswordEqual: boolean = user[0].password === loginUser.password;

    if (!isPasswordEqual) {
      return Promise.reject({
        status: 400,
        message: 'Username or password is incorrect.',
      });
    }
    return user[0];
  },
};
