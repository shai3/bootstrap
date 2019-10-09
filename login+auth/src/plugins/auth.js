
export default {
	register: server => {
		const validate = function(decoded) {
			// do your checks to see if the person is valid
			return { isValid: decoded.userId === 12 };
		};

		server.auth.strategy('jwt', 'jwt', {
			key: server.app.AUTH_SECRET_KEY, // Never Share your secret key
			validate // validate function defined above
		});

		server.auth.default('jwt');
	},
	name: 'auth',
	dependencies: ['hapi-auth-jwt2']
};
