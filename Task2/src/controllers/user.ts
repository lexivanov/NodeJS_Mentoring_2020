import { RequestHandler } from "express";
import { ValidatedRequest } from "express-joi-validation";

import { CreateUpdateUserSchema, GetUserSchema } from "./validation";
import { UserDataService } from "../data-access";


export class UserController {
    public static add: RequestHandler = (req: ValidatedRequest<CreateUpdateUserSchema>, res, next) => {
        try {
            const created = UserDataService.create(req.body);
            return res.status(200).json(created);
        } catch (e) {
            return next(e);
        }
    }

    public static update: RequestHandler = async (req: ValidatedRequest<CreateUpdateUserSchema>, res, next) => {
        try {
            const udpated = await UserDataService.update(req.body, req.params.id);
            return res.status(200).json(udpated);
        } catch (e) {
            return next(e);
        }
    }

    public static get: RequestHandler = async (req: ValidatedRequest<GetUserSchema>, res, next) => {
        const id: string = req.params.id;

        try {
            const user = id ? UserDataService.getById(id) : UserDataService.get(req.query.pattern, req.query.limit);
            return res.status(200).json(user);
        } catch (e) {
            return next(e);
        }
    }

    public static delete: RequestHandler = async (req, res, next) => {
        const id: string = req.params.id;

        try {
            const deleted = await UserDataService.delete(id);
            return res.status(200).json(deleted);
        } catch (e) {
            return next(e);
        }
    }
} 
