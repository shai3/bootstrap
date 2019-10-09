/* eslint-disable no-console */
import _ from 'lodash';

const pickRequestForLog = request =>
	_.pick(request, [
		'auth',
		'method',
		'id',
		'info',
		'mimie',
		'params',
		'payload',
		'response.headers',
		'response.source',
		'response.statusCode',
		'response.output',
		'response.isBoom',
		'path'
	]);

export default {
	register: server => {
		server.events.on({ name: 'request', channels: 'error' }, (request, event) => {
			const { error: err } = event;
			// eslint-disable-next-line no-param-reassign
			event.error.message = `Server Unknown 500 error at ${request.method}${request.path} \n${err.message}`;
			console.error(err, pickRequestForLog(request));
		});

		server.ext('onPreResponse', async (request, h) => {
			const { message, isBoom } = request.response;

			if (isBoom) {
				// Deal with the message/term/payload if not 401 which has special treatment
				// TODO: every status code thrown from hapi should be added to the array

				const statusCode = _.get(request, 'response.output.statusCode');
				if (statusCode === 500) {
					return h.continue;
				}

				const serverMessage = _.defaultTo(_.get(request, 'response.data'), message);
				const logMessage = `Server path '${request.path}' responded with status code ${statusCode}
				and message - ${_.isObject(serverMessage) ? JSON.stringify(serverMessage) : serverMessage}`;
				let logType = 'trace';
				if (_.includes([400, 403, 422], statusCode)) {
					logType = 'warn';
				} else if (_.includes([404], statusCode)) {
					logType = 'error';
				}
				console[logType](logMessage, _.assign(pickRequestForLog(request), { serverMessage }));
			}
			return h.continue;
		});
	},
	name: 'error'
};
