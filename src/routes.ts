import Hapi from '@hapi/hapi';
import { PeriodController } from './controllers/PeriodController';
import { PeriodService } from './services/PeriodService';
import { PeriodRepository } from './repositories/PeriodRepository';
import { GradeController } from './controllers/GradeController';
import { GradeService } from './services/GradeService';
import { GradeRepository } from './repositories/GradeRepository';
import { SectionController } from './controllers/SectionController';
import { SectionService } from './services/SectionService';
import { SectionRepository } from './repositories/SectionRepository';
import { TeacherController } from './controllers/TeacherController';
import { TeacherService } from './services/TeacherService';
import { TeacherRepository } from './repositories/TeacherRepository';
import { CourseController } from './controllers/CourseController';
import { CourseService } from './services/CourseService';
import { CourseRepository } from './repositories/CourseRepository';

const periodRepository = new PeriodRepository();
const periodService = new PeriodService(periodRepository);
const periodController = new PeriodController(periodService);

const gradeRepository = new GradeRepository();
const gradeService = new GradeService(gradeRepository);
const gradeController = new GradeController(gradeService);

const sectionRepository = new SectionRepository();
const sectionService = new SectionService(sectionRepository);
const sectionController = new SectionController(sectionService);

const teacherRepository = new TeacherRepository();
const teacherService = new TeacherService(teacherRepository);
const teacherController = new TeacherController(teacherService);

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);

// Aquí irán las rutas
const routes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return 'Hola Mundo!';
    }
  },
  {
    method: 'GET',
    path: '/health',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return h.response({ status: 'ok' }).code(200);
    }
  },
  {
    method: 'GET',
    path: '/periods',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return periodController.getAll(request, h);
    }
  },
  {
    method: 'GET',
    path: '/periods/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return periodController.getById(request, h);
    }
  },
  {
    method: 'POST',
    path: '/periods',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return periodController.create(request, h);
    }
  },
  {
    method: 'PUT',
    path: '/periods/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return periodController.update(request, h);
    }
  },
  {
    method: 'DELETE',
    path: '/periods/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return periodController.delete(request, h);
    }
  },
  {
    method: 'GET',
    path: '/grades',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return gradeController.getAll(request, h);
    }
  },
  {
    method: 'GET',
    path: '/grades/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return gradeController.getById(request, h);
    }
  },
  {
    method: 'POST',
    path: '/grades',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return gradeController.create(request, h);
    }
  },
  {
    method: 'PUT',
    path: '/grades/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return gradeController.update(request, h);
    }
  },
  {
    method: 'DELETE',
    path: '/grades/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return gradeController.delete(request, h);
    }
  },
  {
    method: 'GET',
    path: '/sections',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return sectionController.getAll(request, h);
    }
  },
  {
    method: 'GET',
    path: '/sections/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return sectionController.getById(request, h);
    }
  },
  {
    method: 'POST',
    path: '/sections',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return sectionController.create(request, h);
    }
  },
  {
    method: 'PUT',
    path: '/sections/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return sectionController.update(request, h);
    }
  },
  {
    method: 'DELETE',
    path: '/sections/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return sectionController.delete(request, h);
    }
  },
  {
    method: 'GET',
    path: '/teachers',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return teacherController.getAll(request, h);
    }
  },
  {
    method: 'GET',
    path: '/teachers/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return teacherController.getById(request, h);
    }
  },
  {
    method: 'POST',
    path: '/teachers',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return teacherController.create(request, h);
    }
  },
  {
    method: 'PUT',
    path: '/teachers/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return teacherController.update(request, h);
    }
  },
  {
    method: 'DELETE',
    path: '/teachers/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return teacherController.delete(request, h);
    }
  },
  {
    method: 'GET',
    path: '/courses',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return courseController.getAll(request, h);
    }
  },
  {
    method: 'GET',
    path: '/courses/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return courseController.getById(request, h);
    }
  },
  {
    method: 'POST',
    path: '/courses',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return courseController.create(request, h);
    }
  },
  {
    method: 'PUT',
    path: '/courses/{id}',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return courseController.update(request, h);
    }
  },
  {
    method: 'GET',
    path: '/grades/{gradeId}/courses',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return courseController.getCoursesByGrade(request, h);
    }
  }
];

export default routes;
