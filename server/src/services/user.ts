import { ERRORS } from 'language/en';
import RowNotFoundError from 'errors/rowNotFound';
import UserModel from '../models/user';

import Logger from 'utils/logger';
import generateToken from '@/utils/generateToken';

const logger = new Logger('services/user');

export async function create(userData: any) {
  logger.info(`Creating User`);

  const { email, name, pic } = userData;
  const data = userData;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    throw new Error('User Already Exist');
  }

  const user = await UserModel.create(data);
  const token = generateToken(user._id);

  const { _id } = user;
  if (user) {
    return {
      data: { _id, name, email, pic, token },
      message: 'Insert Succesfully'
    };
  } else {
    throw new Error('Error Occured');
  }
}

export async function authUser(userData: any) {
  logger.info(`Authenticating User`);

  const { email, password } = userData;

  const userExists: any = await UserModel.findOne({ email });
  if (userExists && (await userExists.matchPassword(password))) {
    const token = generateToken(userExists._id);
    const { _id, name, email, pic } = userExists;

    return {
      data: { _id, name, email, pic, token },
      message: 'Login Succesfully'
    };
  } else {
    throw new Error('Invalid User or Password');
  }
}
