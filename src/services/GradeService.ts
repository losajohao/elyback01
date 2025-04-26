import { Grade } from '../models/Grade';
import { GradeRepository } from '../repositories/GradeRepository';

export class GradeService {
  private gradeRepository: GradeRepository;

  constructor(gradeRepository: GradeRepository) {
    this.gradeRepository = gradeRepository;
  }

  async getAll(): Promise<Grade[]> {
    return this.gradeRepository.getAll();
  }

  async getById(id: number): Promise<Grade | null> {
    return this.gradeRepository.getById(id);
  }

  async create(grade: Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>): Promise<Grade> {
    return this.gradeRepository.create(grade);
  }

  async update(id: number, grade: Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>): Promise<Grade | null> {
    return this.gradeRepository.update(id, grade);
  }

  async delete(id: number): Promise<boolean> {
    return this.gradeRepository.delete(id);
  }
}
