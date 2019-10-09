import login from '../../../services/authentication/login.js';
import validateSchema from '../../../utils/validateSchema.js';
import schema from '../../../schemas/authentication/login.js';

export default {
	auth: false,
	handler: async request => {
		validateSchema(request.payload, schema);
		const { email, password } = request.payload;
		return login(email, password);
	}
};
