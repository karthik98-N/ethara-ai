import { Router } from "express";
import { createTask, deleteTask, listTasks, updateTask } from "../controllers/task.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { taskSchema } from "../validations/task.validation.js";

const router = Router();

router.use(requireAuth);
router.post("/", validate(taskSchema), createTask);
router.get("/", listTasks);
router.put("/:id", validate(taskSchema.partial()), updateTask);
router.delete("/:id", deleteTask);

export default router;
