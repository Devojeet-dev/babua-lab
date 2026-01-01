import jwt from "jsonwebtoken";
import { handleError } from "../utils/handleError.js";

export const verifyJWT = (req, _res, next) => {
  const token = req.cookies?.access_token;
  if (!token) return next(handleError(401, "Not authenticated"));
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    next(handleError(401, "Invalid or expired token"));
  }
};