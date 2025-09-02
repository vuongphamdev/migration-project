import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const user = await UserModel.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;
    const id = await UserModel.create({ name, email });
    res.json({ message: 'User created', id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    await UserModel.update(id, { name, email });
    res.json({ message: 'User updated' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await UserModel.delete(id);
    res.json({ message: 'User deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
