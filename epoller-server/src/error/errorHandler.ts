import { Response, Request, NextFunction } from "express";

import HttpError from "./HttpError";

// Error handler
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  // Check if HttpError class
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }
  // Return 500 with error message
  return res.status(500).json({ error: `${error.message}` });
};
