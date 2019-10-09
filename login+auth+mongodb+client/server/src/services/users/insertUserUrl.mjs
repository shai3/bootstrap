import { collections } from '../../db';

export default async function insertUserUrl(userId, url) {
	const userCollections = await collections.users;
	const { modifiedCount } = await userCollections.updateOne({ _id: userId }, { $addToSet: { urls: url } });
	return modifiedCount;
}
