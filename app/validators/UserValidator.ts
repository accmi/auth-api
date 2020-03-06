import * as Joi from '@hapi/joi'

export const userCreateScheme = Joi.object({
    login: Joi.string()
        .min(3)
        .max(30)
        .required(),
    token: Joi.string().required(),
});

export const userLoginScheme = Joi.object({
    login: Joi.string()
        .min(3)
        .max(30)
        .required(),
    token: Joi.string().required(),
});
