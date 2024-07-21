import Joi from "joi";

// addMessageValidation
export const addMessageValidation = Joi.object({
  content: Joi.string().max(1000).required(),
  receiverId: Joi.string().hex().length(24).required(),
});
// validation on Id
export const messageIdValidation = Joi.object({
  messageId: Joi.string().hex().length(24).required(),
});
