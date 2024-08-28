import { config } from "../config/config";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

// global error handler- middleware

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message,
    errorStack: config.env === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;
