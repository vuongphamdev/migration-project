import { pool } from '../config/db';

export interface Post {
  id?: number;
  user_id: number;
  title: string;
  content: string;
  created_at?: Date;
}

export class PostModel {
  static async create(post: Post): Promise<number> {
    const sql = `INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)`;
    const [result]: any = await pool.query(sql, [
      post.user_id,
      post.title,
      post.content,
    ]);
    return result.insertId;
  }

  static async findAll(): Promise<Post[]> {
    const sql = `SELECT * FROM posts ORDER BY created_at DESC`;
    const [rows] = await pool.query(sql);
    return rows as Post[];
  }

  static async findById(id: number): Promise<Post | null> {
    const sql = `SELECT * FROM posts WHERE id = ?`;
    const [rows]: any = await pool.query(sql, [id]);
    return rows.length ? (rows[0] as Post) : null;
  }

  static async update(id: number, post: Partial<Post>): Promise<boolean> {
    const sql = `UPDATE posts SET title = ?, content = ? WHERE id = ?`;
    const [result]: any = await pool.query(sql, [post.title, post.content, id]);
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const sql = `DELETE FROM posts WHERE id = ?`;
    const [result]: any = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  }
}
