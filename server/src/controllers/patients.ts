import { Request, Response, NextFunction } from 'express';
import ContactModel from '../models/contact';
import Contact from '../models/contact';
export async function fetchAll(req: any, res: Response, next: NextFunction) {
  try {
    const user: any = req.user._id;
    console.log(user);
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
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    next(error);
  }
}

export async function create(req: any, res: Response, next?: NextFunction) {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Please fill all the fields');
  } else {
    const contact: any = new Contact({
      user: req.user._id,
      title,
      content,
      category
    });
    const createdNote = await contact.save();

    res.status(201).json(createdNote);
  }
}

export async function update(req: any, res: Response, next?: NextFunction) {
  const { title, content, category } = req.body;

  const data = await ContactModel.findById(req.params.id);

  // console.log(data)

  // if (data.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (data) {
    data.title = title;
    data.content = content;
    data.category = category;

    const updateData = await data.save();

    res.json(updateData);
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
}

export async function deleteById(req: any, res: any) {
  const data = await ContactModel.findById(req.params.id);

  console.log(data);

  console.log(data.user.toString(), 'user');
  // console.log(req);

  // if (data.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (data) {
    await data.remove();
    res.json({ message: 'Data Removed' });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
}
