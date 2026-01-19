import { Router } from "express";
import { secure } from "../middlewares/auth.middleware.js";
import { createEnvFile, getEnvFile } from "../controllers/env.controller.js";

const router = Router();

router.use(secure);

router.post("/:projectId/env-files", createEnvFile);
router.get("/:projectId/env-files", getEnvFile);

export default router;
