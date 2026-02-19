export interface Task {
  id: string;
  description: string;
  completed: boolean;
  category: "Personal" | "Professional";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDTO {
  description: string;
  category: "Personal" | "Professional";
}

export interface UpdateTaskDTO {
  description?: string;
  completed?: boolean;
}