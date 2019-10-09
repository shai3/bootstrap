/* eslint-disable no-console */
import './config.js';
import server from './server.js';

async function initServer() {
	try {
		await server.init();

		const error = await server.start();
		if (error) {
			throw error;
		}
		console.info(`Server started at ${server.info.uri}`);
	} catch (err) {
		err.message = `Server failed to start, ${err.message}`;
		console.error(err);
	}
	return server;
}

export default initServer();
