import dotenv from 'dotenv';

dotenv.config();

export const expireDayForReadersCard: number = 30;

export const expireDayForBorrowing: number = 14;

export const expireTimeIn: string = '7d';

export default {
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
