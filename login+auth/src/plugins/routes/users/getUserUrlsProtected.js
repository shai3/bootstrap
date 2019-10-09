import getUserUrls from '../../../services/users/getUserUrls.js';

export default {
	auth: 'jwt',
	handler: async request => {
		const { userId } = request.auth.credentials;
		return getUserUrls(userId);
	}
};
