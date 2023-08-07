import { db } from '../data/connection';
import { IBookDomainModel } from '../models/IBookDomainModel';
import { IBorrowDataModel } from '../models/IBorrowDataModel';
import { IRenewBorrowingRequest } from '../models/IRenewBorrowingRequest';
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

  async renewBorrowing(renewedBook: IRenewBorrowingRequest): Promise<number> {
    const renewedBorrowing: number = await borrowingRepository.renewBorrowing(
      renewedBook
    );
    console.log(renewedBorrowing);
    if (renewedBorrowing === -1) {
      return Promise.reject({
        status: 400,
        message: 'This book cannot be renewed.',
      });
    }
    return renewedBorrowing;
  },

  async bookDischarging(userId: string, bookId: string): Promise<number> {
    const isExpired: boolean = await borrowingRepository.borrowingIsExpired(
      userId,
      bookId
    );
    if (isExpired) {
      return Promise.reject({
        status: 400,
        message:
          'The borrowing is expired. Discharge your expired borrowings immediately!',
      });
    }
    return await borrowingRepository.bookDischarging(userId, bookId);
  },

  async payFee(userId: string, bookId: string): Promise<any> {
    const isExpired: boolean = await borrowingRepository.borrowingIsExpired(
      userId,
      bookId
    );
    if (isExpired) 'Discharge your expired borrowings immediately!';
  },
};
