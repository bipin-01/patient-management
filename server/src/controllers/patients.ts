import { Request, Response, NextFunction } from 'express';
import { date } from 'joi';
import ContactModel from '../models/contact';
import Contact from '../models/contact';
export async function fetchAll(req: any, res: Response, next: NextFunction) {
  try {
    const user: any = req.user._id;
    const contacts = await ContactModel.find({ user: user });

    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

export async function fetchById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const data = await ContactModel.findById(id);

    if (id) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error);
  }
}

export async function create(req: any, res: Response, next?: NextFunction) {
  const { name, email, number, pic, dateOfBirth } = req.body;

  if (!name || !email || !number) {
    res.status(400);
    throw new Error('Please fill all the fields');
  } else {
    const contact: any = new Contact({
      user: req.user._id,
      name,
      email,
      number,
      dateOfBirth,
      pic
    });
    const createdNote = await contact.save();

    res.status(201).json(createdNote);
  }
}

export async function update(req: any, res: Response, next?: NextFunction) {
  const { name, email, number, pic, dateOfBirth } = req.body;

  const data = await ContactModel.findById(req.params.id);

  if (data) {
    data.name = name;
    data.email = email;
    data.number = number;
    data.pic = pic;
    data.dateOfBirth = dateOfBirth;


    const updateData = await data.save();

    res.json(updateData);
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
}

export async function deleteById(req: any, res: any) {
  const data = await ContactModel.findById(req.params.id);

  if (data) {
    await data.remove();
    res.json({ message: 'Data Removed' });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
}
