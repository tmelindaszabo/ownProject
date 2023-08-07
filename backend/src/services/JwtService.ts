import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { expireTimeIn } from '../config';

dotenv.config();

export const jwtService = {
  async generateAccessToken(userId: number, isAdmin: boolean): Promise<string> {
    const key: string = `${process.env.SECRET_KEY}`;
    return jwt.sign({ userId: userId, isAdmin: isAdmin }, key, {
      expiresIn: expireTimeIn,
    });
  },

  getUserIdFromToken(token: string): number {
    token = token.split(' ')[1];
    const jwtPayload = jwt.verify(
      token,
      `${process.env.SECRET_KEY}`
    ) as jwt.JwtPayload;
    return jwtPayload.userId;
  },

  verifyAccessToken(token: string, checkAdmin: boolean = false): boolean {
    try {
      const jwtPayload = jwt.verify(
        token,
        `${process.env.SECRET_KEY}`
      ) as jwt.JwtPayload;
      if (jwtPayload.isAdmin) {
        checkAdmin = jwtPayload.isAdmin;
      }
      const expireTime = jwtPayload.exp as number;
      return Date.now() < expireTime * 1000 ? true : false;
    } catch (err) {
      return false;
    }
  },
};
