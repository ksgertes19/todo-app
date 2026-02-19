import { Task } from "../types";

export const localStorage = {
  saveTasks: (tasks: Task[]): void => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  },

  loadTasks: (): Task[] => {
    const data = window.localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  },

  clearTasks: (): void => {
    window.localStorage.removeItem("tasks");
  },
};