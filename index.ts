import Hapi from '@hapi/hapi';
import routes from './src/routes';
import HapiCors from 'hapi-cors'; // Importar el plugin CORS

const start = async function() {

    const server: Hapi.Server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register({
        plugin: HapiCors,
        options: {
            origin: ['*'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }
    }); // Registrar el plugin CORS

    server.route(routes);

    await server.start();

    console.log(`Servidor corriendo en: ${server.info.uri}`);
};

start();
