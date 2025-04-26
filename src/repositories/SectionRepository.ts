import { Section } from '../models/Section';
import pool from '../config/db';

export class SectionRepository {
  async getAll(): Promise<Section[]> {
    try {
      const result = await pool.query('SELECT * FROM sections');
      return result.rows as Section[];
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get all sections');
    }
  }

  async getById(id: number): Promise<Section | null> {
    try {
      const result = await pool.query('SELECT * FROM sections WHERE id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] as Section : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get section by id');
    }
  }

  async create(section: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>): Promise<Section> {
    try {
      const { grade_id, name, period_id, classroom, capacity, tutor_id } = section;
      const result = await pool.query(
        'INSERT INTO sections (grade_id, name, period_id, classroom, capacity, tutor_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [grade_id, name, period_id, classroom, capacity, tutor_id]
      );
      return result.rows[0] as Section;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to create section');
    }
  }

  async update(id: number, section: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>): Promise<Section | null> {
    try {
      const { grade_id, name, period_id, classroom, capacity, tutor_id } = section;
      const result = await pool.query(
        'UPDATE sections SET grade_id = $1, name = $2, period_id = $3, classroom = $4, capacity = $5, tutor_id = $6 WHERE id = $7 RETURNING *',
        [grade_id, name, period_id, classroom, capacity, tutor_id, id]
      );
      return result.rows.length > 0 ? result.rows[0] as Section : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to update section');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await pool.query('DELETE FROM sections WHERE id = $1', [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to delete section');
    }
  }
}
