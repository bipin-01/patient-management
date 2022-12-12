import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

import ValidationError from 'errors/validation';

export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      return next(new ValidationError(error.message));
    }

    req.query = value;
    next();
  };
}

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return next(new ValidationError(error.message));
    }

    req.body = value;
    next();
  };
}
