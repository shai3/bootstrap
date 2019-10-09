import _ from 'lodash';
import mongodb from 'mongodb';
import { collections } from '../db';

const { ObjectId } = mongodb;

export default {
	register: server => {
		const validate = async decoded => {
			const usersCollections = await collections.users;
			const user = await usersCollections.findOne({ _id: new ObjectId(decoded.userId) });
			if (_.isEmpty(user)) {
				return { isValid: false };
			}

			return { isValid: true };
		};

		server.auth.strategy('jwt', 'jwt', {
			key: server.app.AUTH_SECRET_KEY, // Never Share your secret key
			validate, // validate function defined above
			verifyOptions: {
				// ignoreExpiration: true,
				algorithms: ['HS256']
			}
		});
	},
	name: 'auth',
	dependencies: ['hapi-auth-jwt2']
};
