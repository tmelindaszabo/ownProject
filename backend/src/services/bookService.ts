import { IAddBookRequest } from '../models/IAddBookRequest';
import { IBookDomainModel } from '../models/IBookDomainModel';
import { IDbResultDataModel } from '../models/IDbResultDataModel';
import { bookRepository } from '../repository/bookRepository';

export const bookService = {
  async getAllBooks(): Promise<IBookDomainModel[]> {
    return await bookRepository.getAllBooks();
  },

  async getBookById(id: string): Promise<IBookDomainModel> {
    const book = await bookRepository.getBookById(id);
    if (Array.isArray(book) && book.length === 0) {
      return Promise.reject({
        status: 400,
        message: 'This id is not exist.',
      });
    }
    return book;
  },

  async addNewBook(book: IAddBookRequest): Promise<IDbResultDataModel> {
    return await bookRepository.addNewBook(book);
  },

  async deleteBookById(id: string): Promise<number> {
    const deletedBook = await bookRepository.deleteBookById(id);
    if (!deletedBook) {
      return Promise.reject({
        status: 400,
        message: 'This id is not exist.',
      });
    }
    return deletedBook;
  },
};
