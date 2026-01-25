import { rateLimit, ipKeyGenerator } from "express-rate-limit";

const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000 * 15, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts, please try again later.",
  },
  validate: { trustProxy: false },
  keyGenerator: (req) => {
    return req.user ? String(req.user) : ipKeyGenerator(req.ip);
  },
});

const createProjectRateLimiter = rateLimit({
  windowMs: 60 * 1000 * 10,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Hold on! Too many requests. Please try again later.",
  },
  keyGenerator: (req) => {
    return req.user ? String(req.user) : ipKeyGenerator(req.ip);
  },
  validate: { trustProxy: false },
});

const deleteProjectRateLimiter = rateLimit({
  windowMs: 60 * 1000 * 10,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Hold on! Too many requests. Please try again later.",
  },
  keyGenerator: (req) => {
    return req.user ? String(req.user) : ipKeyGenerator(req.ip);
  },
  validate: { trustProxy: false },
});

export { loginRateLimiter, createProjectRateLimiter, deleteProjectRateLimiter };
