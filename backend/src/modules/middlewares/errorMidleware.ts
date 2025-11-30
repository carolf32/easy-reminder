import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export class ErrorMiddleware {
  static execute(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
