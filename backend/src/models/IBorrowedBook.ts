export interface IBorrowedBook {
  id: number;
  userId: number;
  bookId: string;
  borrowDate: number;
  expireDate: number;
  isBorrowRenew: number;
  isBookReturned: number;
}
