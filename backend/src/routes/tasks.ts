import express from "express";
import * as taskController from "../controllers/taskController";
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} from "../middleware/validator";

const router = express.Router();

router.get("/", taskController.getAllTasks);
router.post("/", validateCreateTask, taskController.createTask);
router.put("/:id", validateTaskId, validateUpdateTask, taskController.updateTask);
router.delete("/:id", validateTaskId, taskController.deleteTask);

export default router;