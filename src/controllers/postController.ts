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
    // Parse pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Validate pagination parameters
    if (page < 1) {
      return ResponseHandler.badRequest(
        res,
        'Invalid page number',
        'Page must be greater than 0'
      );
    }

    if (limit < 1 || limit > 100) {
      return ResponseHandler.badRequest(
        res,
        'Invalid limit',
        'Limit must be between 1 and 100'
      );
    }

    const { posts, total } = await PostModel.findAllWithPagination(page, limit);

    return ResponseHandler.successWithPagination(
      res,
      'Posts fetched successfully',
      posts,
      page,
      total,
      limit
    );
  } catch (err) {
    console.error('Error fetching posts:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to fetch posts',
      err instanceof Error ? err.message : 'Unknown error'
    );
  }
};

// Optional: Get all posts without pagination (for dropdown lists, etc.)
export const getAllPostsNoPagination = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.findAll();
    return ResponseHandler.success(
      res,
      'All posts fetched successfully',
      posts
    );
  } catch (err) {
    console.error('Error fetching all posts:', err);
    return ResponseHandler.internalError(
      res,
      'Failed to fetch all posts',
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
