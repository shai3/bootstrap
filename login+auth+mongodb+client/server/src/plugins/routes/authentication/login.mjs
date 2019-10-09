import login from '../../../services/authentication/login';
import validateSchema from '../../../utils/validateSchema';
import schema from '../../../schemas/authentication/login';

export default {
	auth: false,
	handler: async request => {
		validateSchema(request.payload, schema);
		const { email, password } = request.payload;
		return login(email, password);
	}
};
