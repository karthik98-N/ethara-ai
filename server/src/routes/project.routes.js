import { Router } from "express";
import { createProject, deleteProject, getProject, listProjects, updateProject } from "../controllers/project.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { projectSchema } from "../validations/project.validation.js";

const router = Router();

router.use(requireAuth);
router.post("/", requireRole("ADMIN"), validate(projectSchema), createProject);
router.get("/", listProjects);
router.get("/:id", getProject);
router.put("/:id", requireRole("ADMIN"), validate(projectSchema.partial()), updateProject);
router.delete("/:id", requireRole("ADMIN"), deleteProject);

export default router;
