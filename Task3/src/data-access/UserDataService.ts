import * as createError from "http-errors";
import { Op } from "sequelize";

import { IUser } from "../types";
import { User } from "../models";
import { IDataService } from "./types";

class UserDataService implements IDataService<IUser> {
  public async create(user) {
    const [newUser, created] = await User.findOrCreate({ where: { login: user.login }, defaults: user });
    if (!created) throw new createError(403, "User with this login already created");

    return { id: newUser.id, login: newUser.login, age: newUser.age };
  }

  public async update(user: Omit<IUser, "id">, id: string) {
    const foundUser = await User.findOne({ where: { id } });
    if (!foundUser) throw new createError(404, "User was not found");;
    const [, updated] = await User.update({...foundUser, ...user}, { where: { id }, returning: true });
    return { id: updated[0].id, login: updated[0].login, age: updated[0].age };
  }

  public get(pattern?: string, limit?: number) {
    return User.findAll({ where: pattern && { login: { [Op.like]: `%${pattern}%` } }, limit, order: ["login"], attributes: ["id", "login", "age"] });
  }

  public getById(id: any) {
    return User.findOne({ where: { id }, attributes: ["id", "login", "age"] });
  }

  public async delete(id: any) {
    const foundUser = await User.findOne({ where: { id }, attributes: ["id", "login", "age"]});
    if (!foundUser) throw createError(404, "User to delete was not found");
    await foundUser.destroy();
    return foundUser;
  }
}

export const userDataService = new UserDataService();