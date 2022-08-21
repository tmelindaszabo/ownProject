import { NextFunction, Request, Response } from 'express';
import { IBorrowRequest } from '../models/IBorrowRequest';

export const borrowingController = {
  async newBorrow(req: Request, res: Response, next: NextFunction) {
    //ticketId
    //userId
    const newBorrowRequest: IBorrowRequest = req.body;
  },
};
