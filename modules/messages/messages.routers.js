import { Router } from "express";
import {
  readAllMessages,
  addMessage,
  readMessage,
  deleteMessage,
} from "./messages.controllers.js";
import {
  addMessageValidation,
  messageIdValidation,
} from "./messages.validation.js";
import { validate } from "../../middlewares/validate.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const messageRouter = Router();

messageRouter
  .route("/")
  .get(verifyToken(), readAllMessages)
  .post(verifyToken(), validate(addMessageValidation), addMessage);
messageRouter
  .route("/:messageId")
  .get(verifyToken(), validate(messageIdValidation), readMessage)
  .delete(verifyToken(), validate(messageIdValidation), deleteMessage);
export default messageRouter;
