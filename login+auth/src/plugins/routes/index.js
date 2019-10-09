import login from './authentication/login.js';
import getUserUrlsProtected from './users/getUserUrlsProtected.js';
import getUserUrlsPublic from './users/getUserUrlsPublic.js';

export default {
	register: server => {
		server.route({ method: 'POST', path: '/login', options: login });
		server.route({ method: 'GET', path: '/user-urls-private', options: getUserUrlsProtected });
		server.route({ method: 'GET', path: '/user-urls', options: getUserUrlsPublic });
	},
	name: 'plugin-routes'
};
