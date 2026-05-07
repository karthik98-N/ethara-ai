import { prisma } from "../config/prisma.js";

export async function createProject(req, res, next) {
  try {
    const project = await prisma.project.create({
      data: { ...req.body, createdById: req.user.id }
    });
    res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
}

export async function listProjects(_req, res, next) {
  try {
    const projects = await prisma.project.findMany({
      include: { creator: { select: { id: true, name: true } }, members: true, tasks: true },
      orderBy: { createdAt: "desc" }
    });
    res.json({ projects });
  } catch (error) {
    next(error);
  }
}

export async function getProject(req, res, next) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { members: true, tasks: true, comments: true }
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await prisma.project.update({ where: { id: req.params.id }, data: req.body });
    res.json({ project });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
