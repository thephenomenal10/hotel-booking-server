import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

interface ErrorObject {
  status: string;
  statusCode: number;
  message: string;
  description?: string;
  errStack?: string;
}

/**
 * Global error handler middleware.
 */
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDev = process.env.APP_ENVIRONMENT === "development";

  const errorResponse: ErrorObject = {
    status: "error",
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    description: err.isOperational ? err.message : "Unexpected server error.",
    errStack: isDev ? err.stack : undefined,
  };

  res.status(errorResponse.statusCode).json(errorResponse);
};
