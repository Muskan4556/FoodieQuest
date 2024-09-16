import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

// Error handler middleware
const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules
export const validateMyUserRequest = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("city").optional().isString().withMessage("City must be a string"),
  body("country").optional().isString().withMessage("Country must be a string"),
  handleValidationErrors,
];
