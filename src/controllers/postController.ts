// src/controllers/postController.ts
import { Request, Response } from 'express';
import { PostModel } from '../models/postModel';
import { ResponseHandler } from '../utils/responseHandler';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { user_id, title, content } = req.body;
    if (!user_id || !title || !content) {
      return ResponseHandler.badRequest(
        res,
        'Missing required fields',
        'user_id, title, and content are required'
      );
    }

    const postId = await PostModel.create({ user_id, title, content });
    return ResponseHandler.success(
      res,
      'Post created successfully',
      { id: postId },
      201
    );
  } catch (err) {
    console.error('Error creating post:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to create post',
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.findAll();
    return ResponseHandler.success(res, 'Posts fetched successfully', posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to fetch posts',
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = await PostModel.findById(id);

    if (!post) {
      return ResponseHandler.notFound(res, 'Post not found');
    }

    return ResponseHandler.success(res, 'Post fetched successfully', post);
  } catch (err) {
    console.error('Error fetching post:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to fetch post',
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    const updated = await PostModel.update(id, { title, content });
    if (!updated) {
      return ResponseHandler.notFound(res, 'Post not found');
    }

    return ResponseHandler.success(res, 'Post updated successfully', { id });
  } catch (err) {
    console.error('Error updating post:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to update post',
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await PostModel.delete(id);

    if (!deleted) {
      return ResponseHandler.notFound(res, 'Post not found');
    }

    return ResponseHandler.success(res, 'Post deleted successfully', { id });
  } catch (err) {
    console.error('Error deleting post:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to delete post',
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
};
