import Joi from '@hapi/joi';

// prettier-ignore
export default Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(20).required(),
});
