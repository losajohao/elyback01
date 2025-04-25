import Hapi from '@hapi/hapi';
import { PeriodController } from './controllers/PeriodController';
import { PeriodService } from './services/PeriodService';
import { PeriodRepository } from './repositories/PeriodRepository';

const periodRepository = new PeriodRepository();
const periodService = new PeriodService(periodRepository);
const periodController = new PeriodController(periodService);

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
  }
];

export default routes;
