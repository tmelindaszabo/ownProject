import { db } from '../data/connection';
import { IBorrowDataModel } from '../models/IBorrowDataModel';
import { bookRepository } from '../repository/bookRepository';
import { borrowingRepository } from '../repository/borrowingRepository';

export const borrowingService = {
  async borrowBook(book: IBorrowDataModel): Promise<any> {
    const borrowedBook: number = await bookRepository.updateBookOnBorrowingById(
      book.bookId
    );
    if (borrowedBook === 0) {
      return Promise.reject({
        status: 400,
        message: 'There is no available piece of the selected book.',
      });
    }
    return await borrowingRepository.bookBorrowing(book);
  },

  async renewBorrowing(id: string): Promise<number> {
    const renewedBorrowing = await borrowingRepository.renewBorrowing(id);
    if (renewedBorrowing === 0) {
      return Promise.reject({
        status: 400,
        message: 'You already have renewed your borrowing.',
      });
    }
    return renewedBorrowing;
  },
};
