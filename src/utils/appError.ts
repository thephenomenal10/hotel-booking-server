class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  description: string;

  constructor({
    message,
    statusCode,
    isOperational = true,
    description = "",
  }: {
    message: string;
    statusCode: number;
    isOperational?: boolean;
    description?: string;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.description = description;

    Error.captureStackTrace(this, this.constructor); // capture the stack trace
  }
}

export default AppError;
