import Joi from "joi";
export const messageSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  limit: Joi.number().required(),
  messageBox: Joi.array().required(),
});