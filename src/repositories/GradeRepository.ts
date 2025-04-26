import { Grade } from '../models/Grade';
import pool from '../config/db';

export class GradeRepository {
  async getAll(): Promise<Grade[]> {
    try {
      const result = await pool.query('SELECT * FROM grades');
      return result.rows as Grade[];
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get all grades');
    }
  }

  async getById(id: number): Promise<Grade | null> {
    try {
      const result = await pool.query('SELECT * FROM grades WHERE id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] as Grade : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get grade by id');
    }
  }

  async create(grade: Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>): Promise<Grade> {
    try {
      const { name, level_number } = grade;
      const result = await pool.query(
        'INSERT INTO grades (name, level_number) VALUES ($1, $2) RETURNING *',
        [name, level_number]
      );
      return result.rows[0] as Grade;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to create grade');
    }
  }

  async update(id: number, grade: Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>): Promise<Grade | null> {
    try {
      const { name, level_number } = grade;
      const result = await pool.query(
        'UPDATE grades SET name = $1, level_number = $2 WHERE id = $3 RETURNING *',
        [name, level_number, id]
      );
      return result.rows.length > 0 ? result.rows[0] as Grade : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to update grade');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await pool.query('DELETE FROM grades WHERE id = $1', [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to delete grade');
    }
  }
}
