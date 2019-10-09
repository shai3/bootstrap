import registerUser from '../../../services/authentication/registerUser.js';
import validateSchema from '../../../utils/validateSchema.js';
import schema from '../../../schemas/authentication/register.js';

export default {
	auth: false,
	handler: async request => {
		validateSchema(request.payload, schema);
		const { firstName, lastName, email, password } = request.payload;
		return registerUser(firstName, lastName, email, password);
	}
};
