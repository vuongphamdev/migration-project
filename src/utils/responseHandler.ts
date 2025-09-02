// src/utils/responseHandler.ts
import { Response } from 'express';

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string | null;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export class ResponseHandler {
  /**
   * Send a successful response
   */
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      message,
      data,
      error: null,
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Send a successful response with pagination
   */
  static successWithPagination<T>(
    res: Response,
    message: string,
    data: T,
    currentPage: number,
    totalItems: number,
    itemsPerPage: number,
    statusCode: number = 200
  ): Response {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const response: ApiResponse<T> = {
      message,
      data,
      error: null,
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        hasNext: currentPage < totalPages,
        hasPrevious: currentPage > 1,
      },
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Send an error response
   */
  static error(
    res: Response,
    message: string,
    error?: string,
    statusCode: number = 500
  ): Response {
    const response: ApiResponse = {
      message,
      data: null,
      error: error || message,
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Send a not found response
   */
  static notFound(
    res: Response,
    message: string = 'Resource not found'
  ): Response {
    return ResponseHandler.error(res, message, message, 404);
  }

  /**
   * Send a bad request response
   */
  static badRequest(res: Response, message: string, error?: string): Response {
    return ResponseHandler.error(res, message, error, 400);
  }

  /**
   * Send an internal server error response
   */
  static internalError(
    res: Response,
    message: string = 'Internal server error',
    error?: string
  ): Response {
    return ResponseHandler.error(res, message, error, 500);
  }
}
