import Joi from "joi";

// signUp  Validation (register)
export const signUpValidation = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required().max(100),
  password: Joi.string().required().min(8).max(20),
});

// signIn Validation
export const signInValidation = Joi.object({
  username: Joi.string().min(3).max(20),
  email: Joi.string().email().max(100),
  password: Joi.string().required().min(8).max(20),
})
  .or("email", "username")
  .messages({
    "object.missing":
      "At least one of email or username must be provided along with the password",
  });

// otp verification Validation
export const verifyOtpValidation = Joi.object({
  email: Joi.string().email().required().max(100),
  otp: Joi.string().length(6).required(),
});
