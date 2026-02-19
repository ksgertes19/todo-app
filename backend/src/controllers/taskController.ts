import {
  Request,
  Response,
  NextFunction,
} from "express";
import { storage } from "../utils/storage";
import { TaskModel } from "../models/task";
import { CreateTaskDTO, UpdateTaskDTO } from "../types";

// Get /api/tasks -> Retrieve all tasks
export const getAllTasks = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = storage.getAllTasks();
    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve tasks",
    });
  }
};

// POST /api/tasks -> Create a new task
export const createTask = (
  req: Request,
  res: Response,
) => {
  try {
    const dto: CreateTaskDTO = req.body;

    // Validate
    const error = TaskModel.validate(dto);
    if (error) {
      return res.status(400).json({
        success: false,
        error,
      })
    }

    // Create and save task
    const newTask = TaskModel.create(dto);
    const savedTask = storage.addTask(newTask);

    res.status(201).json({
      success: true,
      data: savedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create task",
    });
  }
};

// PUT /api/tasks/:id -> Update an existing task
export const updateTask = (
  req: Request,
  res: Response,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const updates: UpdateTaskDTO = req.body;

    // Check if task exists
    const existingTask = storage.getTaskById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Update task
    const updatedTask = storage.updateTask(id, updates);
    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update task",
    });
  }
};

// DELETE /api/tasks/:id -> Delete a task
export const deleteTask = (
  req: Request,
  res: Response,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

    // Check if task exists
    const existingTask = storage.getTaskById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Delete task
    storage.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete task",
    })
  }
};