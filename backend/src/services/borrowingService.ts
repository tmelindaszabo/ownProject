import { db } from '../data/connection';
import { IBookDomainModel } from '../models/IBookDomainModel';
import { IBorrowDataModel } from '../models/IBorrowDataModel';
import { bookRepository } from '../repository/bookRepository';
import { borrowingRepository } from '../repository/borrowingRepository';

export const borrowingService = {
  async borrowBook(book: IBorrowDataModel): Promise<number> {
    const checkBorrewedBookExists: IBookDomainModel =
      await bookRepository.getBookById(book.bookId.toString());
    console.log(
      'checkBorrewedBookExists: ',
      Object.values(checkBorrewedBookExists)[0].id
    );
    if (Object.values(checkBorrewedBookExists)[0].id === undefined) {
      return Promise.reject({
        status: 400,
        message: 'This book is not in our repertoire.',
      });
    }
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

  async renewBorrowing(bookId: string): Promise<number> {
    const renewedBorrowing: number = await borrowingRepository.renewBorrowing(
      bookId
    );
    console.log(renewedBorrowing);
    if (renewedBorrowing === 0) {
      return Promise.reject({
        status: 400,
        message: 'You already have renewed your borrowing.',
      });
    }
    if (renewedBorrowing === -1) {
      return Promise.reject({
        status: 400,
        message: 'This book is not borrowed.',
      });
    }
    return renewedBorrowing;
  },
};
