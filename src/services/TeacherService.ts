import { Teacher } from '../models/Teacher';
import { TeacherRepository } from '../repositories/TeacherRepository';

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor(teacherRepository: TeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  async getAll(): Promise<Teacher[]> {
    return this.teacherRepository.getAll();
  }

  async getById(id: number): Promise<Teacher | null> {
    return this.teacherRepository.getById(id);
  }

  async create(teacher: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>): Promise<Teacher> {
    return this.teacherRepository.create(teacher);
  }

  async update(id: number, teacher: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>): Promise<Teacher | null> {
    return this.teacherRepository.update(id, teacher);
  }

  async delete(id: number): Promise<boolean> {
    return this.teacherRepository.delete(id);
  }
}
