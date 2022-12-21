import { db } from '../data/connection';
import { IBorrowDataModel } from '../models/IBorrowDataModel';
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
    const book = await db.query<IDbResultDataModel[]>(
      `SELECT * FROM borrowing WHERE id = ? and isRenew = 0`,
      [id]
    );
    if (book.length === 0) {
      return 0;
    }
    const renewedBorrowing = await db.query<IDbResultDataModel>(
      `UPDATE borrowing SET isRenew = 1 WHERE id = ?`,
      [id]
    );
    return renewedBorrowing.affectedRows;
  },
};
