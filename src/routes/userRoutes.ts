import { Router } from 'express';
import {
  getUsers,
  addUser,
  removeUser,
  updateUser,
  getUserById,
} from '../controllers/userController';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.post('/', addUser);
userRouter.delete('/:id', removeUser);

export default userRouter;
