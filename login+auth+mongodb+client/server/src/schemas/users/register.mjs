import joi from '@hapi/joi';

// prettier-ignore
export default {
	firstName: joi.string().min(2).max(40).required(),
	lastName: joi.string().min(2).max(40).required(),
	email: joi.string().email().required(),
	password: joi.string().min(4).max(20).required()
};
