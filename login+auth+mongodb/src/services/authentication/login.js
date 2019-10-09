import Bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import { collections } from '../../db/index.js';
import signToken from '../../utils/signToken.js';

const INVALID_CREDENTIALS = 'Sorry, you entered an incorrect email address or password.';

export default async function login(email, password) {
	const userCollections = await collections.users;
	const projection = {
		encodedPassword: 1,
		firstName: 1,
		lastName: 1,
		_id: 1
	};
	const user = await userCollections.findOne({ email }, { projection });

	if (!user) {
		throw boom.badData(INVALID_CREDENTIALS);
	}

	const encodedPassword = Buffer.from(user.encodedPassword, 'base64').toString();
	const doesPasswordMatch = await Bcrypt.compare(password, encodedPassword);
	if (!doesPasswordMatch) {
		throw boom.badData(INVALID_CREDENTIALS);
	}

	return {
		// eslint-disable-next-line no-underscore-dangle
		token: signToken({ userId: user._id.toString() }),
		userDisplayName: `${user.firstName} ${user.lastName}`
	};
}
