import { prisma } from "../config/prisma.js";

export async function getAnalytics(_req, res, next) {
  try {
    const [totalTasks, completedTasks, overdueTasks, projects] = await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: { status: "COMPLETED" } }),
      prisma.task.count({ where: { deadline: { lt: new Date() }, status: { not: "COMPLETED" } } }),
      prisma.project.count()
    ]);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks: totalTasks - completedTasks,
      overdueTasks,
      projects,
      productivityScore: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
    });
  } catch (error) {
    next(error);
  }
}
