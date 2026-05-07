import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
import { generateSprintPlan } from "../controllers/ai.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", getAnalytics);
router.post("/ai-sprint-plan", generateSprintPlan);

export default router;
