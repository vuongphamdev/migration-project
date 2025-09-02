// src/controllers/postController.ts
import { Request, Response } from 'express';
import { PostModel } from '../models/postModel';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { user_id, title, content } = req.body;
    if (!user_id || !title || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const postId = await PostModel.create({ user_id, title, content });
    res.status(201).json({ id: postId, message: 'Post created successfully' });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.findAll();
    res.json({ message: 'success', data: posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = await PostModel.findById(id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    const updated = await PostModel.update(id, { title, content });
    if (!updated) return res.status(404).json({ message: 'Post not found' });

    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await PostModel.delete(id);

    if (!deleted) return res.status(404).json({ message: 'Post not found' });

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
