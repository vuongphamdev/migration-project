import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../controllers/postController';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);
postRouter.put('/:id', updatePost);
postRouter.post('/', createPost);
postRouter.delete('/:id', deletePost);

export default postRouter;
