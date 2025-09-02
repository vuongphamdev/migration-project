import { pool } from '../config/db';

export interface User {
  id?: number;
  name: string;
  email: string;
  created_at?: Date;
}

export class UserModel {
  static async create(user: User): Promise<number> {
    const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
    const [result]: any = await pool.query(sql, [user.name, user.email]);
    return result.insertId; // trả về id user vừa tạo
  }

  static async findAll(): Promise<User[]> {
    const sql = `SELECT * FROM users ORDER BY created_at DESC`;
    const [rows] = await pool.query(sql);
    return rows as User[];
  }

  static async findById(id: number): Promise<User | null> {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const [rows]: any = await pool.query(sql, [id]);
    return rows.length ? (rows[0] as User) : null;
  }

  static async update(id: number, user: Partial<User>): Promise<boolean> {
    const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    const [result]: any = await pool.query(sql, [user.name, user.email, id]);
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const sql = `DELETE FROM users WHERE id = ?`;
    const [result]: any = await pool.query(sql, [id]);
    return result.affectedRows > 0;
  }
}
