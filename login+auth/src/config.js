import dotenv from 'dotenv';

process.on('uncaughtException', error => {
	// eslint-disable-next-line no-param-reassign
	error.message = `Uncaught Exception: ${error.message}`;
	// eslint-disable-next-line no-console
	console.error(error);
});

process.on('unhandledRejection', error => {
	// eslint-disable-next-line no-param-reassign
	error.message = `Unhandled promise rejection: ${error.message}`;
	// eslint-disable-next-line no-console
	console.error(error);
});

dotenv.config();
