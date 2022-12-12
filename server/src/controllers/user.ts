import { Request, Response, NextFunction } from 'express';
import * as UserService from '@/services/user';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password, pic } = req.body;

    const data = { name, email, password, pic };

    const insertData = await UserService.create(data);

    res.json({ data: insertData.data, message: insertData.message });
  } catch (error) {
    next(error);
  }
}

export async function authUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const data = { email, password };

    const authData = await UserService.authUser(data);

    res.json({ authData });
  } catch (error) {
    next(error);
  }
}
