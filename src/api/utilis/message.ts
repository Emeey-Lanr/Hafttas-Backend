import Joi from "joi";
export const messageSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  limit: Joi.number().required(),
  messageBox: Joi.array().required(),
});

export  const sendMessageSchema = Joi.object({
  username: Joi.string().required(),
  link:Joi.string().required(),
  message: Joi.string().max(250).required(),
  date: Joi.string().required(),
  time:Joi.string().required(),
})