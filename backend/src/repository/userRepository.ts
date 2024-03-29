import { db } from '../data/connection';
import { IDbResultDataModel } from '../models/IDbResultDataModel';
import IRegistrationRequest from '../models/IRegistrationRequest';
import IRegistrationResultDataModel from '../models/IRegistrationResultDataModel';

export const userRepository = {
  async registerNewUser(
    newRegistration: IRegistrationRequest
  ): Promise<number> {
    const newUser = await db.query<IDbResultDataModel>(
      `INSERT INTO user (name, username, email, password, expDateOfReadersCard, isAdmin) VALUES (?,?,?,?,?,?)`,
      [
        newRegistration.name,
        newRegistration.username,
        newRegistration.email,
        newRegistration.password,
        newRegistration.expDateOfReadersCard,
        `${newRegistration.isAdmin}`,
      ]
    );
    return newUser.insertId;
  },

  async getUserByUsername(
    username: string
  ): Promise<IRegistrationResultDataModel[]> {
    const user = await db.query<IRegistrationResultDataModel[]>(
      `SELECT * FROM user WHERE username = ?`,
      [username]
    );
    return user;
  },

  // async isReadersCardValid(id: number): Promise<boolean> {
  //   const readersCardExpDate: number = await db.query(`SELECT expDateOfReadersCard FROM user WHERE id = ?`, [`${id}`])

  //   if(readersCardExpDate < )
  // }
};
