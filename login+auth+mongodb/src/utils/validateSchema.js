import boom from '@hapi/boom';
import _ from 'lodash';

export default function validateSchema(values, schema) {
	const result = schema.validate(values, { abortEarly: false });
	if (_.isNil(result.error)) {
		return true;
	}
	const err = boom.badData('validationError');
	err.output.payload.details = _.chain(result)
		.get('error.details', [])
		.map(({ path, message }) => [_.join(path, '.'), message])
		.fromPairs()
		.value();
	throw err;
}
