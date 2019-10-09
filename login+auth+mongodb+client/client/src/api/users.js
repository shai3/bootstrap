import createApi, { METHODS } from './createApi';
import { push } from '../history';

export const getUserUrls = createApi(METHODS.GET, '/user-urls');
const putUserUrl = createApi(METHODS.PUT, '/user-urls');

export async function insertUserUrl(payload) {
	await putUserUrl(payload);
	push('/urls');
}
