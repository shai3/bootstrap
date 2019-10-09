import _ from 'lodash';
import { FORM_ERROR } from 'final-form';
import { setUserSession, getUserSession } from '../components/UserSessionProvider';

export const METHODS = { POST: 'POST', PATCH: 'PATCH', GET: 'GET', PUT: 'PUT' };

function getErrorFromResponse(status, result) {
	if (_.includes([500], status)) {
		console.error(result);
	} else {
		console.info(result);
	}

	if (status === 403) {
		// TODO: show Forbidden page without redirect
	}
	return _.get(result, 'details', { [FORM_ERROR]: result.message });
}

async function fetchServer(url, method, token, payload) {
	const headers = { 'Content-Type': 'application/json', Authorization: token };
	const body = JSON.stringify(payload);
	const response = await fetch(`${process.env.REACT_APP_SERVER}${url}`, { method, body, headers });

	const status = _.get(response, 'status', 500);

	const contentType = response.headers.get('content-type');
	const result = await response[_.includes(contentType, 'application/json') ? 'json' : 'text']();

	return { response, result, status };
}

export default (method, url) => async payload => {
	const token = _.get(getUserSession(), 'token');

	const { response, result, status } = await fetchServer(url, method, token, payload);
	const wwwAuthenticate = response.headers.get('www-authenticate');
	if (wwwAuthenticate && wwwAuthenticate.match(/Token error/)) {
		console.info('Token is expired');
		setUserSession(null);
		return;
	}
	if (status >= 200 && status < 300) {
		return result;
	}

	throw getErrorFromResponse(status, result);
};
