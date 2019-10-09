import _ from 'lodash';
import { collections } from '../../db';

export default async function getUserUrls(userId) {
	const userCollections = await collections.users;
	const user = await userCollections.findOne({ _id: userId }, { projection: { urls: 1 } });
	return _.get(user, 'urls', []);
}
