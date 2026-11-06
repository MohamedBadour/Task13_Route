import rateLimit from "express-rate-limit";

// Limit to 3 login requests per minute
export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3,
  message: {
    message: "Too many login attempts. Please try again after a minute."
  },
  standardHeaders: true,
  legacyHeaders: false
});
