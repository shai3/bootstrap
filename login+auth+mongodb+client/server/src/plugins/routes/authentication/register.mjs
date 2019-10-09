import registerUser from '../../../services/authentication/registerUser';
import validateSchema from '../../../utils/validateSchema';
import schema from '../../../schemas/authentication/register';

export default {
	auth: false,
	handler: async request => {
		validateSchema(request.payload, schema);
		const { firstName, lastName, email, password } = request.payload;
		return registerUser(firstName, lastName, email, password);
	}
};
