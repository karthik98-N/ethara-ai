import { prisma } from "../config/prisma.js";

export async function createTask(req, res, next) {
  try {
    const task = await prisma.task.create({ data: req.body, include: { assignee: true, project: true } });
    req.app.get("io")?.to(task.projectId).emit("task:created", task);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
}

export async function listTasks(req, res, next) {
  try {
    const tasks = await prisma.task.findMany({
      where: req.query.projectId ? { projectId: req.query.projectId } : undefined,
      include: { assignee: { select: { id: true, name: true } }, project: true, comments: true },
      orderBy: { createdAt: "desc" }
    });
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await prisma.task.update({ where: { id: req.params.id }, data: req.body });
    req.app.get("io")?.to(task.projectId).emit("task:updated", task);
    res.json({ task });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await prisma.task.delete({ where: { id: req.params.id } });
    req.app.get("io")?.to(task.projectId).emit("task:deleted", task.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
