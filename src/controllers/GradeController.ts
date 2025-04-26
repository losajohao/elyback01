import { Request, ResponseToolkit } from '@hapi/hapi';
import { GradeService } from '../services/GradeService';
import { Grade } from '../models/Grade';

export class GradeController {
  private gradeService: GradeService;

  constructor(gradeService: GradeService) {
    this.gradeService = gradeService;
  }

  async getAll(request: Request, h: ResponseToolkit) {
    try {
      const grades = await this.gradeService.getAll();
      return h.response(grades).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get all grades' }).code(500);
    }
  }

  async getById(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const grade = await this.gradeService.getById(id);
      if (grade) {
        return h.response(grade).code(200);
      } else {
        return h.response({ message: 'Grade not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get grade by id' }).code(500);
    }
  }

  async create(request: Request, h: ResponseToolkit) {
    try {
      const grade = request.payload as Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>;
      const createdGrade = await this.gradeService.create(grade);
      return h.response(createdGrade).code(201);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to create grade' }).code(500);
    }
  }

  async update(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const grade = request.payload as Omit<Grade, 'id' | 'createdAt' | 'updatedAt'>;
      const updatedGrade = await this.gradeService.update(id, grade);
      if (updatedGrade) {
        return h.response(updatedGrade).code(200);
      } else {
        return h.response({ message: 'Grade not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to update grade' }).code(500);
    }
  }

  async delete(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const deleted = await this.gradeService.delete(id);
      if (deleted) {
        return h.response({ message: 'Grade deleted' }).code(200);
      } else {
        return h.response({ message: 'Grade not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to delete grade' }).code(500);
    }
  }
}
