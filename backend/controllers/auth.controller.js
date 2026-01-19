import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import cookieOptions from "../utils/cookieOptions.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters");
  }

  //Check if user exists
  const userExist = await User.findOne({ username });
  if (userExist) {
    throw new ApiError(409, "User already exists");
  }

  //Create user
  const user = await User.create({
    username,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User Registered successfully",
    user: {
      id: user._id,
      username: user.username,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new ApiError(400, "All fields are required");

  // check user exist
  const user = await User.findOne({ username });

  if (!user) throw new ApiError(404, "User not found");

  // Verify Password
  const isPasswordValid = await user.checkPassword(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  // generate token
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // set cookies
  res
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 30 * 60 * 1000, // 30 minutes
    })
    .status(200)
    .json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
      },
      accessToken,
    });
});

const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) throw new ApiError(401, "Refresh Token Missing");

  const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await User.findById(decode.userId);

  const newAccessToken = generateAccessToken(user._id);

  res
    .cookie("accessToken", newAccessToken, {
      ...cookieOptions,
      maxAge: 30 * 60 * 1000, // 30 minutes
    })
    .status(200)
    .json({
      success: true,
      message: "Access token refreshed successfully",
      user: {
        id: user._id,
        username: user.username,
      },
      accessToken: newAccessToken,
    });
});

const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      ...cookieOptions,
    })
    .clearCookie("refreshToken", {
      ...cookieOptions,
    })
    .status(200)
    .json({
      success: true,
      message: "User logged out successfully",
    });
};

export { register, login, refresh, logout };
