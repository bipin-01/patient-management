import { Request, Response, NextFunction } from 'express';
import * as UserService from '@/services/user';
import generateToken from '@/utils/generateToken';
import UserModel from '../models/user';

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

export async function updateUserProfile(
  req: any,
  res: Response,
  next: NextFunction
) {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
}
