import Joi, { string } from "joi";

export const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).min(7).required(),
    password:Joi.string().min(6).required()
})

export const userSigninSchema = Joi.object({
    username: Joi.string().required(),
    password:Joi.string().min(6).required()
})