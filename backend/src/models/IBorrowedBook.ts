export interface IBorrowedBook {
  id: number;
  userId: number;
  bookId: string;
  borrowDate: number;
  expireDate: number;
  isBorrowRenewed: number;
  isBookReturned: number;
}
