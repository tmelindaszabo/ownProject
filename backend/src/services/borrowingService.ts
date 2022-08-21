import { IBorrowRequest } from '../models/IBorrowRequest';
import { bookRepository } from '../repository/bookRepository';

export const borrowingService = {
  async borrowBook(books: IBorrowRequest, userId: number): Promise<any> {
    const borrowedBook = await bookRepository.updateBookOnBorrowingById(
      books.bookId
    );
  },
};
