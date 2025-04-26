import { Request, ResponseToolkit } from '@hapi/hapi';
import { CourseService } from '../services/CourseService';
import { Course } from '../models/Course';

export class CourseController {
  private courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  async getAll(request: Request, h: ResponseToolkit) {
    try {
      const courses = await this.courseService.getAll();
      return h.response(courses).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get all courses' }).code(500);
    }
  }

  async getById(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const course = await this.courseService.getById(id);
      if (course) {
        return h.response(course).code(200);
      } else {
        return h.response({ message: 'Course not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get course by id' }).code(500);
    }
  }

  async create(request: Request, h: ResponseToolkit) {
    try {
      const course = request.payload as Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;
      const createdCourse = await this.courseService.create(course);
      return h.response(createdCourse).code(201);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to create course' }).code(500);
    }
  }

  async update(request: Request, h: ResponseToolkit) {
    try {
      const id = parseInt(request.params.id, 10);
      const course = request.payload as Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;
      const updatedCourse = await this.courseService.update(id, course);
      if (updatedCourse) {
        return h.response(updatedCourse).code(200);
      } else {
        return h.response({ message: 'Course not found' }).code(404);
      }
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to update course' }).code(500);
    }
  }

  async getCoursesByGrade(request: Request, h: ResponseToolkit) {
    try {
      const gradeId = parseInt(request.params.gradeId, 10);
      const courses = await this.courseService.getCoursesByGrade(gradeId);
      return h.response(courses).code(200);
    } catch (error) {
      console.error(error);
      return h.response({ message: 'Failed to get courses by grade' }).code(500);
    }
  }
}
