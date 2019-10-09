import register from './authentication/register';
import login from './authentication/login';
import getUserUrls from './users/getUserUrls';
import insertUserUrl from './users/insertUserUrl';

export default {
	register: server => {
		server.route({ method: 'POST', path: '/register', options: register });
		server.route({ method: 'POST', path: '/login', options: login });
		server.route({ method: 'GET', path: '/user-urls', options: getUserUrls });
		server.route({ method: 'PUT', path: '/user-urls', options: insertUserUrl });
	},
	name: 'plugin-routes'
};
