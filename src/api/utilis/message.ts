import Joi from "joi";
const messageScheam = Joi.object({
      username: Joi.string().required() ,
    userId:Joi.string().required(),
    userEmail: Joi.string().required(),
    anonymousName: Joi.string().required(),
    anonymousLink:Joi.string().required(),
    messageBox:Joi.array().required(),
})