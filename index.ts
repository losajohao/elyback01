import Hapi from '@hapi/hapi';
import routes from './src/routes';

const start = async function() {

    const server: Hapi.Server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes);

    await server.start();

    console.log(`Servidor corriendo en: ${server.info.uri}`);
};

start();
