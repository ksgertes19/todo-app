import { Task, CreateTaskDTO } from "../types";
import { v4 as uuidv4 } from "uuid";

export class TaskModel {
  static create(dto: CreateTaskDTO): Task {
    const now = new Date().toISOString();
    return {
      id: uuidv4(),
      description: dto.description,
      completed: false,
      category: dto.category,
      createdAt: now,
      updatedAt: now,
    }
  }

  static validate(dto: CreateTaskDTO): string | null {
    if (!dto.description || dto.description.trim() === "") {
      return "Description is required";
    }
    if (!["Personal", "Professional"].includes(dto.category)) {
      return "Category must be either 'Personal' or 'Professional'";
    }
    return null;
  }
}