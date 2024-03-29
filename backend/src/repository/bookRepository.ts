import { db } from '../data/connection';
import { IAddBookRequest } from '../models/IAddBookRequest';
import { IBookDomainModel } from '../models/IBookDomainModel';
import { IDbResultDataModel } from '../models/IDbResultDataModel';

export const bookRepository = {
  async getAllBooks(): Promise<IBookDomainModel[]> {
    return await db.query<IBookDomainModel[]>(`SELECT * FROM book`, []);
  },

  async getBookById(id: string): Promise<IBookDomainModel> {
    const book: IBookDomainModel = await db.query<IBookDomainModel>(
      `SELECT * FROM book WHERE id = ?`,
      [id]
    );
    return book;
  },

  async addNewBook(book: IAddBookRequest): Promise<IDbResultDataModel> {
    const newBook = await db.query<IDbResultDataModel>(
      `INSERT INTO book (title, author, publisher, ISBN, description,numOfAllBook) VALUES (?,?,?,?,?,?)`,
      [
        book.title,
        book.author,
        book.publisher,
        `${book.ISBN}`,
        book.description,
        `${book.numOfAllBook}`,
      ]
    );
    return newBook;
  },

  async updateBookOnBorrowingById(bookId: number): Promise<number> {
    const borrowedBook: IDbResultDataModel[] = await db.query<
      IDbResultDataModel[]
    >(`SELECT * FROM book WHERE id = ? AND numOfAllBook >= 1`, [`${bookId}`]);
    if (borrowedBook.length === 0) {
      return 0;
    }
    const newBorrowedBook = await db.query<IDbResultDataModel>(
      `UPDATE book SET numOfAllBook = numOfAllBook - 1 WHERE id = ?`,
      [`${bookId}`]
    );
    return newBorrowedBook.affectedRows;
  },

  async deleteBookById(id: string): Promise<number> {
    const deletedBook = await db.query<IDbResultDataModel>(
      `DELETE FROM book WHERE id = ?`,
      [id]
    );
    return deletedBook.affectedRows;
  },
};
