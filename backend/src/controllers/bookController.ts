import { NextFunction, Request, Response } from 'express';
import { json } from 'stream/consumers';
import { IAddBookRequest } from '../models/IAddBookRequest';
import { IBookDomainModel } from '../models/IBookDomainModel';
import { IDbResultDataModel } from '../models/IDbResultDataModel';
import { bookService } from '../services/bookService';

export const bookController = {
  async getAllBooks(
    _req: Request,
    res: Response<IBookDomainModel[]>,
    next: NextFunction
  ) {
    await bookService
      .getAllBooks()
      .then((books) => {
        return res.json(books);
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async getBookById(
    req: Request,
    res: Response<IBookDomainModel>,
    next: NextFunction
  ) {
    const { id } = req.params;
    await bookService
      .getBookById(id)
      .then((book) => {
        return res.json(book);
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async addNewBook(
    req: Request<IAddBookRequest>,
    res: Response,
    next: NextFunction
  ) {
    const newBook: IAddBookRequest = {
      ...req.body,
    };
    await bookService
      .addNewBook(newBook)
      .then(() => {
        return res.json({
          status: 202,
          message: 'Book is added to the library',
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return res.status(400).send({
          message: 'The book adding to library is failed.',
        });
      });
  },
  async deleteBookById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await bookService
      .deleteBookById(id)
      .then(() => {
        return res.json({
          status: 202,
          message: 'Deletion was successful',
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return res.status(400).send({
          message: 'The book adding to library is failed.',
        });
      });
  },
};
