import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend Is Running Perfectly...",
  });
});

export default router;
