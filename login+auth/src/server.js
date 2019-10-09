import Hapi from '@hapi/hapi';
import jwtPlugin from 'hapi-auth-jwt2';
import authPlugin from './plugins/auth.js';
import routesPlugin from './plugins/routes/index.js';
import errorPlugin from './plugins/error.js';

const serverOptions = {
	port: process.env.SERVER_PORT,
	routes: {
		cors: { origin: 'ignore' },
		validate: {
			options: {
				abortEarly: false
			},
			failAction: (request, h, error) => error
		}
	}
};
const server = new Hapi.Server(serverOptions);

async function init() {
	// init server.app variables
	server.app.AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;

	const registerError = await server.register([jwtPlugin, authPlugin, routesPlugin, errorPlugin]);

	if (registerError) {
		throw registerError;
	}
}

server.init = init;
export default server;
