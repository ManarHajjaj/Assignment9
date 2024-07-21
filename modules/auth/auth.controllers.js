import User from "../../database/models/user.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { sendEmails } from "../../email/email.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = catchError(async (req, res, next) => {
  const { email, username, password } = req.body;

  // Build the query based on whether email or username is provided
  const query = email ? { email } : { username };

  // get the User from db
  const user = await User.findOne(query);

  // If can't find user with these credentials, or invalid password
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new AppError("Invalid Credentials", 401));
  }
  // Generate JWT token if credentials are correct
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({ token, message: "Signed In Successfully", user });
});

// sign up and will get an email with otp for verification
export const register = catchError(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return next(new AppError("Email already Exists", 400));

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    otp,
  });

  // Save the user to the database
  await newUser.save();
  // Send OTP to user's email
  await sendEmails(email, otp);
  res.status(201).json({
    message: "User registered successfully. Please verify your email.",
  });
});

// verify email using otp for signing up successfully
export const verifyOTP = catchError(async (req, res, next) => {
  const { email, otp } = req.body;

  // Find user by email and OTP
  const user = await User.findOne({ email, otp });
  if (!user) {
    next(new AppError("Invalid OTP or email", 400));
  }

  // Clear OTP after verification
  user.otp = null;
  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
});

// get All Users
export const getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ message: "Users are returned successfully", users });
});
