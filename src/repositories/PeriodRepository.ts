import { Period } from '../models/Period';
import pool from '../config/db';

export class PeriodRepository {
  async getAll(): Promise<Period[]> {
    try {
      const result = await pool.query('SELECT * FROM periods');
      console.log(result);
      return result.rows as Period[];
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al obtener los periodos');
    }
  }

  async getById(id: number): Promise<Period | null> {
    try {
      const result = await pool.query('SELECT * FROM periods WHERE id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] as Period : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al obtener el periodo');
    }
  }

  async create(period: Omit<Period, 'id' | 'created_at' | 'updated_at'>): Promise<Period> {
    try {
      const { year, start_date, end_date, is_current } = period;
  
      const result = await pool.query(
        'INSERT INTO periods (year, start_date, end_date, is_current) VALUES ($1, $2, $3, $4) RETURNING *',
        [year, start_date, end_date, is_current]
      );
  
      return result.rows[0]; // Devuelve el periodo completo con id y fechas automáticas
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al crear el periodo');
    }
  }
  

  async update(id: number, period: Omit<Period, 'id' | 'created_at' | 'updated_at'>): Promise<Period | null> {
    try {
      const { year, start_date, end_date, is_current } = period;
      const result = await pool.query(
        'UPDATE periods SET year = $1, start_date = $2, end_date = $3, is_current = $4 WHERE id = $5 RETURNING *',
        [year, start_date, end_date, is_current, id]
      );
      return result.rows.length > 0 ? result.rows[0] as Period : null;
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al actualizar el periodo');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await pool.query('DELETE FROM periods WHERE id = $1', [id]);
      return (result.rowCount ?? 0) > 0; // Usa nullish coalescing para evitar el error
    } catch (error: any) {
      console.error(error);
      throw new Error('Error al eliminar el periodo');
    }
  }
  
}
