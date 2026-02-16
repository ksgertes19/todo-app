import { Request, Response, NextFunction } from "express";

// Validate create task payload
export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { description, category } = req.body;

  // Check if description exists and is not empty
  if (!description || typeof description !== "string") {
    res.status(400).json({
      success: false,
      message: "Description is required and must be a string",
    });
    return;
  }

  // Check if description is not just whitespace
  if (description.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Description cannot be empty or whitespace only",
    });
    return;
  }

  // Check if category exists and is valid
  if (!category || typeof category !== "string") {
    res.status(400).json({
      success: false,
      message: "Category is required and must be a string",
    });
    return;
  }

  // Validate category is one of the allowed values
  const validCategories = ["Personal", "Professional"];
  if (!validCategories.includes(category)) {
    res.status(400).json({
      success: false,
      message: `Category must be one of: ${validCategories.join(", ")}`,
    });
    return;
  }

  // If all validations pass, proceed to next middleware
  next();
};

// Validate update task payload
export const validateUpdateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { description, completed } = req.body;

  // Check that at least one field is provided
  if (
    description === undefined &&
    completed === undefined
  ) {
    res.status(400).json({
      success: false,
      message: "At least one field (description or completed) must be provided",
    });
    return;
  }

  // Validate description if provided
  if (description !== undefined) {
    if (typeof description !== "string") {
      res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
      return;
    }

    if (description.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: "Description cannot be empty or whitespace only",
      });
      return;
    }
  }

  // Validate completed flag if provided
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      res.status(400).json({
        success: false,
        message: "Completed must be a boolean value",
      });
      return;
    }
  }

  // If all validations pass, proceed to next middleware
  next();
};

// Optional: Validate task ID format (UUID)
export const validateTaskId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  // Simple UUID v4 validation pattern
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID format",
    });
    return;
  }

  next();
};
