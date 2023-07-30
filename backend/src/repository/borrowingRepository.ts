import { db } from '../data/connection';
import { IBorrowDataModel } from '../models/IBorrowDataModel';
import { IBorrowedBook } from '../models/IBorrowedBook';
import { IDbResultDataModel } from '../models/IDbResultDataModel';

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
      return -1;
    }
    if (parseInt(book[0].bookId) < 1) {
      console.log('parseInt(book[0].bookId)', parseInt(book[0].bookId));
      return 0;
    }
    const renewedBorrowing = await db.query<IDbResultDataModel>(
      `UPDATE borrowing SET isBorrowRenewed = 1 WHERE bookId = ?`,
      [id]
    );
    return renewedBorrowing.affectedRows;
  },
};
