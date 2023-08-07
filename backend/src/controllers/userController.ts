import { NextFunction, Request, Response } from 'express';
import { expireDayForReadersCard } from '../config';
import { ILoginRequest } from '../models/ILoginRequest';
import IRegistrationRequest from '../models/IRegistrationRequest';
import { userService } from '../services/userService';

export const userController = {
  async registerUser(
    req: Request<IRegistrationRequest>,
    res: Response,
    next: NextFunction
  ) {
    function generateExpDateForReadersCard(): string {
      let now = new Date();
      now.setDate(now.getDate() + expireDayForReadersCard);
      return now.toISOString().slice(0, 10);
    }

    const newRegistration: IRegistrationRequest = {
      ...req.body,
      expDateOfReadersCard: generateExpDateForReadersCard(),
      isAdmin: 0,
    };

    await userService
      .register(newRegistration)
      .then(() => {
        return res.json({
          status: 202,
          message: 'Registration was successful',
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return res.status(400).send({
          message: 'Registration failed',
        });
      });
  },

  async loginUser(
    req: Request<ILoginRequest>,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const user: ILoginRequest = {
      ...req.body,
    };

    await userService
      .login(user)
      .then(() => {
        return res.json({
          status: 202,
          message: 'Login was successful',
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return res.status(400).send({
          message: 'Login failed',
        });
      });
  },
};
