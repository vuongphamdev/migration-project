import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { ResponseHandler } from '../utils/responseHandler';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserModel.findAll();
    return ResponseHandler.success(res, 'Users fetched successfully', users);
  } catch (err: any) {
    console.error('Error fetching users:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to fetch users',
      err.message
    );
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const user = await UserModel.findById(id);
    if (user) {
      return ResponseHandler.success(res, 'User fetched successfully', user);
    } else {
      return ResponseHandler.notFound(res, 'User not found');
    }
  } catch (err: any) {
    console.error('Error fetching user:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to fetch user',
      err.message
    );
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return ResponseHandler.badRequest(
        res,
        'Missing required fields',
        'name and email are required'
      );
    }

    const id = await UserModel.create({ name, email });
    return ResponseHandler.success(
      res,
      'User created successfully',
      { id },
      201
    );
  } catch (err: any) {
    console.error('Error creating user:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to create user',
      err.message
    );
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const updated = await UserModel.update(id, { name, email });

    if (!updated) {
      return ResponseHandler.notFound(res, 'User not found');
    }

    return ResponseHandler.success(res, 'User updated successfully', { id });
  } catch (err: any) {
    console.error('Error updating user:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to update user',
      err.message
    );
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const deleted = await UserModel.delete(id);

    if (!deleted) {
      return ResponseHandler.notFound(res, 'User not found');
    }

    return ResponseHandler.success(res, 'User deleted successfully', { id });
  } catch (err: any) {
    console.error('Error deleting user:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to delete user',
      err.message
    );
  }
}
