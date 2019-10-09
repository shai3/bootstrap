import joi from '@hapi/joi';

// prettier-ignore
export default {
	email: joi.string().email().required(),
	password: joi.string().max(20).required()
};
