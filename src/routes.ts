import Hapi from '@hapi/hapi';

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
  }
];

export default routes;
