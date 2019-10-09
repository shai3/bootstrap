import createApi, { METHODS } from './createApi';
import { push } from '../history';
import {setUserSession} from "../components/UserSessionProvider";

const register = createApi(METHODS.POST, '/register');
const login = createApi(METHODS.POST, '/login');

export async function registerUser(payload) {
	const user = await register(payload);
	setUserSession(user);
}

export async function loginUser(payload) {
	const user = await login(payload);
	setUserSession(user);
	push('/home');
}

