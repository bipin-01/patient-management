import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req: any, res: any, next) => {
  let token: any;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //decodes token id
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
