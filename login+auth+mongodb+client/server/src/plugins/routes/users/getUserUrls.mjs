import mongodb from 'mongodb';
import getUserUrls from '../../../services/users/getUserUrls';

const { ObjectId } = mongodb;

export default {
	auth: 'jwt',
	handler: async request => {
		const { userId } = request.auth.credentials;
		return getUserUrls(new ObjectId(userId));
	}
};
