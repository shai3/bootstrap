import getUserUrls from '../../../services/users/getUserUrls.js';

export default {
	auth: false,
	handler: async request => {
		return getUserUrls('public');
	}
};
