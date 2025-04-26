import { Course } from '../models/Course';
import { CourseRepository } from '../repositories/CourseRepository';

export class CourseService {
  private courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async getAll(): Promise<Course[]> {
    return this.courseRepository.getAll();
  }

  async getById(id: number): Promise<Course | null> {
    return this.courseRepository.getById(id);
  }

  async create(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    return this.courseRepository.create(course);
  }

  async update(id: number, course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course | null> {
    return this.courseRepository.update(id, course);
  }

  async getCoursesByGrade(gradeId: number): Promise<Course[]> {
    return this.courseRepository.getCoursesByGrade(gradeId);
  }
}
