import Bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import { collections } from '../../db';
import signToken from '../../utils/signToken';

export default async function registerUser(firstName, lastName, email, password) {
	const encodedPassword = Buffer.from(await Bcrypt.hashSync(password, Bcrypt.genSaltSync())).toString('base64');

	const usersCollection = await collections.users;

	const userWIthSameEmail = await usersCollection.find({ email }).count();
	if (userWIthSameEmail > 0) {
		const err = boom.badData('validationError');
		err.output.payload.details = { email: 'email is already taken' };
		throw err;
	}

	const res = await usersCollection.insertOne({
		firstName,
		lastName,
		email,
		urls: [],
		encodedPassword
	});

	return {
		token: signToken({ userId: res.insertedId.toString() }),
		userDisplayName: `${firstName} ${lastName}`
	};
}
