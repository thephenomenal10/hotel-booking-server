import { NextFunction, Request, Response } from "express";

/**
 * Wraps async route handlers to catch errors and forward them to error handling middleware.
 */
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
