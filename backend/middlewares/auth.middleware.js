import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const secure = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) throw new ApiError(401, "Not Authenticated");

  const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

  req.user = decode.userId;

  next();
});

export { secure };
