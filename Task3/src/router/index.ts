import * as express from "express";

import { UserController, createUpdateUserValidationMiddleware, getUserValidationMiddleware } from "../controllers";
import { routes } from "../config/constants";

const router = express.Router();

router
    .route(routes.users)
    .get(getUserValidationMiddleware, UserController.get)
    .post(createUpdateUserValidationMiddleware, UserController.add)
    .all((req, res) => res.status(405).send("Avalable methods: GET, POST"));

router
    .route(`${routes.users}/:id`)
    .get(UserController.get)
    .put(createUpdateUserValidationMiddleware, UserController.update)
    .delete(UserController.delete)
    .all((req, res) => res.status(405).send("Avalable methods: GET, PUT, DELETE"))

export default router;
