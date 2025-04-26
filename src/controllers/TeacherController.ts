import { Request, ResponseToolkit } from '@hapi/hapi';
import { TeacherService } from '../services/TeacherService';
import { Teacher } from '../models/Teacher';

export class TeacherController {
  private teacherService: TeacherService;

  constructor(teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  async getAll(request: Request, h: ResponseToolkit) {
    try {
      const teachers = await this.teacherService.getAll();
      return h.response(teachers).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get all teachers' }).code(500);
    }
  }

  async getById(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const teacher = await this.teacherService.getById(id);
      if (teacher) {
        return h.response(teacher).code(200);
      } else {
        return h.response({ message: 'Teacher not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get teacher by id' }).code(500);
    }
  }

  async create(request: Request, h: ResponseToolkit) {
    try {
      const teacher = request.payload as Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>;
      const createdTeacher = await this.teacherService.create(teacher);
      return h.response(createdTeacher).code(201);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to create teacher' }).code(500);
    }
  }

  async update(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const teacher = request.payload as Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>;
      const updatedTeacher = await this.teacherService.update(id, teacher);
      if (updatedTeacher) {
        return h.response(updatedTeacher).code(200);
      } else {
        return h.response({ message: 'Teacher not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to update teacher' }).code(500);
    }
  }

  async delete(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const deleted = await this.teacherService.delete(id);
      if (deleted) {
        return h.response({ message: 'Teacher deleted' }).code(200);
      } else {
        return h.response({ message: 'Teacher not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to delete teacher' }).code(500);
    }
  }
}
