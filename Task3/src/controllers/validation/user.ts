import * as Joi from "@hapi/joi";
import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator
} from "express-joi-validation";

const validator = createValidator();

const createUpdateUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/[^A-Za-z0-9]+/, { invert: true }).required(),
    age: Joi.number().min(4).max(130).required()
});

const getUserSchema = Joi.object({
    limit: Joi.number().optional(),
    pattern: Joi.string().optional(),
});


export interface CreateUpdateUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login: string,
        password: string,
        age: number,
    }
}

export interface GetUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        limit?: number,
        pattern?: string,
    }
}

export const createUpdateUserValidationMiddleware = validator.body(createUpdateUserSchema);
export const getUserValidationMiddleware = validator.query(getUserSchema);
