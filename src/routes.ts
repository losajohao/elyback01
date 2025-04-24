// src/routes.ts
import Hapi from '@hapi/hapi';

// Aquí irán las rutas
const routes: Hapi.ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return 'Hola Mundo!';
    }
  }
];

export default routes;
