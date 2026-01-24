import { Router } from "express";
import { secure } from "../middlewares/auth.middleware.js";
import {
  createEnvFile,
  deleteEnvFile,
  getEnvFile,
  getEnvFileById,
  updateEnvFile,
} from "../controllers/env.controller.js";

const router = Router();

router.use(secure);

router.get("/:projectId/env-files", getEnvFile);
router.post("/:projectId/env-files", createEnvFile);

router.patch("/:projectId/env-files/:envId", updateEnvFile);
router.delete("/:projectId/env-files/:envId", deleteEnvFile);
router.delete("/:projectId/env-files/:envId", getEnvFileById);

export default router;
