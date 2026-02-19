import axios from "axios";
import { 
  Task,
  CreateTaskDTO,
  UpdateTaskDTO
} from "../types";

const API_BASE_URL = "http://localhost:5000/api";

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/tasks`
    );
    return response.data.data;
  },

  createTask: async (dto: CreateTaskDTO): Promise<Task> => {
    const response = await axios.post(
      `${API_BASE_URL}/tasks`,
      dto
    );
    return response.data.data;
  },

  updateTask: async(id: string, dto: UpdateTaskDTO): Promise<Task> => {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${id}`,
      dto
    );
    return response.data.data;
  },

  deleteTask: async(id: string): Promise<void> => {
    await axios.delete(
      `${API_BASE_URL}/tasks/${id}`
    );
  }
}