import { Course } from '../models/Course';
import { GradeCourse } from '../models/GradeCourse';
import pool from '../config/db';

export class CourseRepository {
  async getAll(): Promise<Course[]> {
    try {
      const result = await pool.query('SELECT * FROM courses');
      return result.rows as Course[];
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get all courses');
    }
  }

  async getById(id: number): Promise<Course | null> {
    try {
      const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] as Course : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get course by id');
    }
  }

  async create(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    try {
      const { name, code, description, area } = course;
      const result = await pool.query(
        'INSERT INTO courses (name, code, description, area) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, code, description, area]
      );
      return result.rows[0] as Course;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to create course');
    }
  }

  async update(id: number, course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course | null> {
    try {
      const { name, code, description, area } = course;
      const result = await pool.query(
        'UPDATE courses SET name = $1, code = $2, description = $3, area = $4 WHERE id = $5 RETURNING *',
        [name, code, description, area, id]
      );
      return result.rows.length > 0 ? result.rows[0] as Course : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to update course');
    }
  }

  async getCoursesByGrade(gradeId: number): Promise<Course[]> {
    try {
      const result = await pool.query(
        'SELECT c.* FROM courses c INNER JOIN grade_courses gc ON c.id = gc.course_id WHERE gc.grade_id = $1',
        [gradeId]
      );
      return result.rows as Course[];
    } catch (error: any) {
      console.error(error);
      throw new Error('Failed to get courses by grade');
    }
  }
}
