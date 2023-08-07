import { db } from '../data/connection';
import { IBorrowDataModel } from '../models/IBorrowDataModel';
import { IBorrowedBook } from '../models/IBorrowedBook';
import { IDbResultDataModel } from '../models/IDbResultDataModel';
import { IExpiredBook } from '../models/IExpiredBook';
import { IReturnedBook } from '../models/IReturnedBook';

export const borrowingRepository = {
  async bookBorrowing(bookForBorrowing: IBorrowDataModel): Promise<number> {
    const newBorrowedBook: IDbResultDataModel =
      await db.query<IDbResultDataModel>(
        `INSERT INTO borrowing (userId, bookId, borrowDate, expireDate) VALUES (?,?,?,?)`,
        [
          `${bookForBorrowing.userId}`,
          `${bookForBorrowing.bookId}`,
          bookForBorrowing.borrowDate,
          bookForBorrowing.expireDate,
        ]
      );
    return newBorrowedBook.affectedRows;
  },

  async renewBorrowing(id: string): Promise<number> {
    const now = new Date().toISOString().split('T')[0];
    const book = await db.query<IBorrowedBook[]>(
      `SELECT * FROM borrowing WHERE bookId = ? and isBorrowRenewed = 0 and expireDate > ?`,
      [id, `${now}`]
    );
    if (!book[0]) {
      console.log('it returns with -1');
      return 0;
    }

    const renewedBorrowing = await db.query<IDbResultDataModel>(
      `UPDATE borrowing SET isBorrowRenewed = 1 WHERE bookId = ?`,
      [id]
    );
    return renewedBorrowing.affectedRows;
  },

  async borrowingIsExpired(userId: string, bookId: string): Promise<number> {
    const now = new Date().toISOString().split('T')[0];
    const isExpired = await db.query<IExpiredBook[]>(
      `SELECT * FROM borrowing WHERE userId =? AND bookId = ? AND expireDate < ?`,
      [userId, bookId, `${now}`]
    );
    if (isExpired[0]) {
      console.log('The borrowing is expired');
      return 1;
    }
    return 0;
  },

  async bookDischarging(userId: string, bookId: string): Promise<number> {
    const dischargedBook = await db.query<IReturnedBook>(
      `UPDATE borrowing SET isBookReturned = 1 WHERE userId = ? AND bookId = ?`,
      [userId, bookId]
    );
    return dischargedBook.id;
  },
};
