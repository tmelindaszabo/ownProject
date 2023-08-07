import { NextFunction, Request, Response } from 'express';
import { expireDayForBorrowing } from '../config';
import { IBorrowDataModel } from '../models/IBorrowDataModel';
import { IBorrowRequest } from '../models/IBorrowRequest';
import { borrowingService } from '../services/borrowingService';
import { jwtService } from '../services/JwtService';
import { IRenewBorrowingRequest } from '../models/IRenewBorrowingRequest';

function generateExpDateForBorrowing(): string {
  let now = new Date();
  now.setDate(now.getDate() + expireDayForBorrowing);
  console.log('generateExpDateForBorrowing: ', now.toISOString().slice(0, 10));
  return now.toISOString().slice(0, 10);
}

export const borrowingController = {
  async newBorrow(req: Request, res: Response, next: NextFunction) {
    //ticketId come from request
    //userId come from token
    const newBorrowRequest: IBorrowRequest = {
      ...req.body,
    };
    const authHeader = req.headers.authorization as string;
    //const userId: number = jwtService.getUserIdFromToken(authHeader);
    const userId: number = 2;

    function getBorrowingDate(): string {
      let now = new Date();
      console.log('now: ', now);
      return now.toISOString().slice(0, 10);
    }

    const newBorrowedBook: IBorrowDataModel = {
      ...newBorrowRequest,
      userId: userId,
      borrowDate: getBorrowingDate(),
      expireDate: generateExpDateForBorrowing(),
    };

    await borrowingService
      .borrowBook(newBorrowedBook)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async renewBorrowing(req: Request, res: Response, next: NextFunction) {
    // const bookForRenewBorrowing = {
    //     ...req.body
    // }
    const { bookId } = <{ bookId: string }>req.query;
    console.log(req.query, bookId);
    //const authHeader = req.headers.authorization as string;
    //const userId: number = jwtService.getUserIdFromToken(authHeader);
    //const userId: number = 2;

    const renewedBook: IRenewBorrowingRequest = {
      bookId: bookId,
      renewedExpireDate: generateExpDateForBorrowing(),
    };
    await borrowingService
      .renewBorrowing(renewedBook)
      .then(() => {
        return res.json({
          message: 'Renewing was successful.',
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async bookDischarging(req: Request, res: Response, next: NextFunction) {
    const { bookId } = req.params;
    //const authHeader = req.headers.authorization as string;
    //const userId: number = jwtService.getUserIdFromToken(authHeader);
    const userId: number = 2;
    await borrowingService
      .bookDischarging(`${userId}`, bookId)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },
};
