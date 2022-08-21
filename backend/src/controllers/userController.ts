import { NextFunction, Request, Response } from 'express';
import { expireDayForReadersCard } from '../config';
import IRegistrationRequest from '../models/IRegistrationRequest';
import { userService } from '../services/userService';

export const userController = {
  async registerUser(
    req: Request<IRegistrationRequest>,
    res: Response,
    next: NextFunction
  ) {
    function generateExpDateForReadersCard(): number {
      let now = new Date();
      return now.setDate(now.getDate() + expireDayForReadersCard);
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
        return;
      });
  },
};
