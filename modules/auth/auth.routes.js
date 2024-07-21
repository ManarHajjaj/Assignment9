import { Router } from "express";
import {
  getAllUsers,
  register,
  signIn,
  verifyOTP,
} from "./auth.controllers.js";
import { validate } from "../../middlewares/validate.js";
import {
  signInValidation,
  signUpValidation,
  verifyOtpValidation,
} from "./auth.validation.js";
const authRouter = Router();

authRouter.route("/users").get(getAllUsers);
authRouter.route("/signin").post(validate(signInValidation), signIn);
authRouter.route("/register").post(validate(signUpValidation), register);
authRouter.route("/otp-verify").post(validate(verifyOtpValidation), verifyOTP);
export default authRouter;
