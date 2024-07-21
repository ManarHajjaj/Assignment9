import { catchError } from "../../middlewares/catchError.js";
import Message from "../../database/models/message.model.js";
import { AppError } from "../../utils/appError.js";
import { ObjectId } from "mongodb";

export const readAllMessages = catchError(async (req, res) => {
  const messages = await Message.find();
  res
    .status(200)
    .json({ message: "Messages are retrieved successfully", messages });
});
export const addMessage = catchError(async (req, res) => {
  const newMessage = await Message.create(req.body);
  res
    .status(201)
    .json({ message: "Message is added Successfully", newMessage });
});
export const readMessage = catchError(async (req, res, next) => {
  const messageId = req.params.messageId;
  const userId = new ObjectId(req.user.userId); // Access userId from req.user
  const message = await Message.findById(messageId);

  // check if message exists
  if (!message) return next(new AppError("This Message doesn't Exist", 404));

  // check the user making the request is the owner of the message
  if (!message.receiverId.equals(userId)) {
    return next(
      new AppError(
        "Unauthorized - You are not allowed to perform this action as you're not the owner of this message",
        403
      )
    );
  }

  res
    .status(200)
    .json({ message: "Message is retrieved successfully", message });
});
export const deleteMessage = catchError(async (req, res, next) => {
  const messageId = req.params.messageId;
  const userId = new ObjectId(req.user.userId); // Access userId from req.user
  const message = await Message.findById(messageId);

  // check if message exists
  if (!message) return next(new AppError("This Message doesn't Exist", 404));

  // check the user making the request is the owner of the message
  if (!message.receiverId.equals(userId)) {
    return next(
      new AppError(
        "Unauthorized - You are not allowed to perform this action as you're not the owner of this message",
        403
      )
    );
  }
  await Message.deleteOne({ _id: messageId });

  res.status(200).json({ message: "Message is deleted successfully" });
});
