import { NextFunction, Request, Response } from 'express';
import { expireDayForReadersCard } from '../config';
//import { IRegistrationRequest } from '../models/IRegistrationRequest';

export default interface IRegistrationRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  expDateOfReadersCard: number;
  isAdmin: number;
}

export const userController = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    function generateExpDateForReadersCard(): number {
      let now = new Date();
      return now.setDate(now.getDate() + expireDayForReadersCard);
    }

    const newRegistration: IRegistrationRequest = {
      ...req.body,
      isAdmin: 1,
      expDateOfReadersCard: generateExpDateForReadersCard(),
    };
  },
};
