import { Teacher } from '../models/Teacher';
import pool from '../config/db';

export class TeacherRepository {
  async getAll(): Promise<Teacher[]> {
    try {
      const result = await pool.query('SELECT * FROM teachers');
      return result.rows as Teacher[];
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get all teachers');
    }
  }

  async getById(id: number): Promise<Teacher | null> {
    try {
      const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] as Teacher : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get teacher by id');
    }
  }

  async create(teacher: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>): Promise<Teacher> {
    try {
      const { user_id, first_name, last_name, dni, phone, specialization } = teacher;
      const result = await pool.query(
        'INSERT INTO teachers (user_id, first_name, last_name, dni, phone, specialization) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [user_id, first_name, last_name, dni, phone, specialization]
      );
      return result.rows[0] as Teacher;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to create teacher');
    }
  }

  async update(id: number, teacher: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>): Promise<Teacher | null> {
    try {
      const { user_id, first_name, last_name, dni, phone, specialization } = teacher;
      const result = await pool.query(
        'UPDATE teachers SET user_id = $1, first_name = $2, last_name = $3, dni = $4, phone = $5, specialization = $6 WHERE id = $7 RETURNING *',
        [user_id, first_name, last_name, dni, phone, specialization, id]
      );
      return result.rows.length > 0 ? result.rows[0] as Teacher : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to update teacher');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to delete teacher');
    }
  }
}
