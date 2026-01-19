import { Router } from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller.js";
import { secure } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

// protected route
router.post("/logout", secure, logout);

// test  route
router.get("/me", secure, (req, res) => {
  res.json({
    success: true,
    userId: req.user,
  });
});

export default router;
