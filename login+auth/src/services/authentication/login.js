import boom from '@hapi/boom';
import signToken from '../../utils/signToken.js';

const INVALID_CREDENTIALS = 'Sorry, you entered an incorrect email address or password.';

export default async function login(email, password) {
	if (email !== 'shai32@gmail.com' || password !== '123') {
		throw boom.badData(INVALID_CREDENTIALS);
	}

	return {
		// eslint-disable-next-line no-underscore-dangle
		token: signToken({ userId: 12 })
	};
}
