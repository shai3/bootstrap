import register from './authentication/register.js';
import login from './authentication/login.js';
import getUserUrls from './users/getUserUrls.js';
import insertUserUrl from './users/insertUserUrl.js';

export default {
	register: server => {
		server.route({ method: 'POST', path: '/register', options: register });
		server.route({ method: 'POST', path: '/login', options: login });
		server.route({ method: 'GET', path: '/user-urls', options: getUserUrls });
		server.route({ method: 'PUT', path: '/user-urls', options: insertUserUrl });
	},
	name: 'plugin-routes'
};
