import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateMiddleware = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid request body",
          errors: error.message,
        });
      }
      console.error(error);
      return res.status(400).json({ message: "Invalid request body" });
    }
  };
};
