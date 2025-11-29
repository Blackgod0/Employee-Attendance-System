// src/controllers/userController.ts

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/UserModel";
import { ApiMessages } from "../utils/types/apiMessages";
import { ApiError } from "../utils/types/errors";


const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH as string;

// @desc    Register an employee user
// @route   POST /users/register
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, department, employeeId, role } = req.body as Partial<IUser>;

  // No manager registration here
  if (role === "MANAGER") {
    throw new ApiError(ApiMessages.MANAGER_REGISTRATION_FORBIDDEN);
  }

  if (!name || !email || !password || !employeeId) {
    throw new ApiError(ApiMessages.VALIDATION_REQUIRED_FIELDS);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(ApiMessages.USER_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "employee",
    department: department || "",
    employeeId,
  });

  if (!user) {
    throw new ApiError(ApiMessages.INTERNAL_SERVER_ERROR);
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    success: true,
    accessToken,
    refreshToken,
  });
});

// @desc    Login user (employee or manager)
// @route   POST /users/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    throw new ApiError(ApiMessages.VALIDATION_LOGIN_FIELDS);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(ApiMessages.USER_NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(ApiMessages.INVALID_CREDENTIALS);
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    accessToken,
    refreshToken,
  });
});

// @desc    Current user info
// @route   GET /users/current
// @access  Private
export const currentUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(ApiMessages.UNAUTHORIZED);
  }

  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(ApiMessages.CURRENT_USER_NOT_FOUND);
  }

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  });
});
