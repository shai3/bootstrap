import mongodb from 'mongodb';
import _ from 'lodash';
import boom from '@hapi/boom';
import insertUserUrl from '../../../services/users/insertUserUrl.js';

const { ObjectId } = mongodb;

export default {
	auth: 'jwt',
	handler: async request => {
		const { userId } = request.auth.credentials;
		const url = _.trim(request.payload.url);

		const regexp = /(rtsp):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
		if (!regexp.test(url)) {
			const err = boom.badData('validationError');
			err.output.payload.details = { url: 'url is not a valid rtsp' };
			throw err;
		}

		return insertUserUrl(new ObjectId(userId), url);
	}
};
