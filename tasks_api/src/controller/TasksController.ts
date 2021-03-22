import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Tasks } from "../entity/Tasks";

export const getTasks = async (request: Request, response: Response) => {
  const tasks = await getRepository(Tasks).find({
    order: { id: "ASC" },
  });
  return response.json(tasks);
};

export const getTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await getRepository(Tasks).findOne(id);
  return response.json(task);
};

export const saveTasks = async (request: Request, response: Response) => {
  const task = await getRepository(Tasks).save(request.body);
  return response.json(task);
};

export const updateTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  const task = await getRepository(Tasks).update(id, request.body);

  if (task.affected === 1) {
    const taskUpdate = await getRepository(Tasks).findOne(id);
    return response.json(taskUpdate);
  }

  return response.status(404).json({ message: "Task not found!" });
};

export const finishedTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  const task = await getRepository(Tasks).update(id, {
    finished: true,
  });

  if (task.affected === 1) {
    const taskUpdate = await getRepository(Tasks).findOne(id);
    return response.json({ message: "task finished" });
  }

  return response.status(404).json({ message: "Task not found!" });
};

export const removeTask = async (request: Request, response: Response) => {
  const { id } = request.params;

  const task = await getRepository(Tasks).delete(id);

  if (task.affected === 1) {
    const taskUpdate = await getRepository(Tasks).findOne(id);
    return response.json({ message: "task removed" });
  }

  return response.status(404).json({ message: "Task not found!" });
};
