import * as createError from "http-errors";
import { v4 as uuid } from "uuid";

import { IUser } from "../types";

const users: IUser[] = [
  {
    id: uuid(),
    login: "User1",
    password: "11111",
    age: 15,
    isDeleted: false
  },
  {
    id: uuid(),
    login: "User2",
    password: "11111",
    age: 15,
    isDeleted: false
  },
  {
    id: uuid(),
    login: "User3",
    password: "11111",
    age: 15,
    isDeleted: false
  },
  {
    id: uuid(),
    login: "User4",
    password: "11111",
    age: 15,
    isDeleted: false
  },
  {
    id: uuid(),
    login: "User5",
    password: "11111",
    age: 15,
    isDeleted: false
  },
]

export class UserDataService {
  public static create(user: Omit<IUser, "id" | "isDeleted">) {
    const created = users.find(x => x.login === user.login);
    if (created) throw createError(403, "User with this login already created");

    const newUser: IUser = { ...user, id: uuid(), isDeleted: false };
    users.push(newUser);

    return newUser;
  }

  public static update(user: Omit<IUser, "id" | "isDeleted">, id: string) {
    const targetUser = users.find(x => x.id === id);
    if (!targetUser) throw createError(404, "User was not found");

    Object.assign(targetUser, user);

    return targetUser;
  }

  public static get(pattern?: string, limit?: number) {
    let result = users.filter(x => !x.isDeleted).sort((x, y) => x.login > y.login ? 1 : -1);
    if (pattern) {
      result = result.filter(x => x.login.includes(pattern));
    }

    if (limit) {
      result = result.length > limit
        ? result.slice(0, limit)
        : result;
    }

    return result;
  }

  public static getById(id: string) {
    const targetUser = users.find(x => x.id === id);
    if (!targetUser) throw createError(404, "User was not found");

    return targetUser;
  }

  public static delete(id: string) {
    const targetUser = users.find(x => x.id === id);
    if (!targetUser) throw createError(404, "User to delete was not found");

    targetUser.isDeleted = true;

    return targetUser;
  }
}