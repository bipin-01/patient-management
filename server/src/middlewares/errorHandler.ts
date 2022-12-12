import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import Logger from 'utils/logger';
import { buildError } from 'utils/buildError';

const logger = new Logger('errors');

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 */
export function notFoundError(req: Request, res: Response) {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
}

export function genericErrorHandler(
  err: any, //eslint-disable-line @typescript-eslint/no-explicit-any
  req: Request,
  res: Response,
  next: NextFunction //eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (err.stack) {
    logger.error(err.stack);
  }

  const error = buildError(err);

  res.status(error.code).json({ error });
}
