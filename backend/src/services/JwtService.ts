import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const jwtService = {
  async generateAccessToken(userId: number, isAdmin: boolean): Promise<string> {
    const key: string = `${process.env.SECRET_KEY}`;
    return jwt.sign({ userId: userId, isAdmin: isAdmin }, key);
  },

  getUserIdFromToken(token: string): number {
    token = token.split(' ')[1];
    const jwtPayload = jwt.verify(
      token,
      `${process.env.SECRET_KEY}`
    ) as jwt.JwtPayload;
    return jwtPayload.userId;
  },
};
