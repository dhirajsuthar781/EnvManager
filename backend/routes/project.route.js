import { Router } from "express";
import { secure } from "../middlewares/auth.middleware.js";
import {
  createProject,
  deleteProject,
  getProject,
  getProjectById,
  getRecentProjects,
  shareProject,
  updateProject,
} from "../controllers/project.controller.js";
import {
  createProjectRateLimiter,
  deleteProjectRateLimiter,
} from "../middlewares/ratelimit.middleware.js";

const router = Router();

router.use(secure);


router.post("/", createProjectRateLimiter, createProject);
router.get("/", getProject);
router.get("/recent", getRecentProjects);
router.patch("/:projectId", updateProject);
router.delete("/:projectId", deleteProjectRateLimiter, deleteProject);
router.get("/:projectId", getProjectById);


router.post("/:projectId/share", shareProject);
export default router;
