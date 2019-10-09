import _ from 'lodash';
import React, { memo, useState, useEffect, Children } from 'react';

export const UserSessionContext = React.createContext();
let userSession = {};
try {
	const sessionString = localStorage.getItem('userSession');
	userSession = _.isNil(sessionString) ? {} : JSON.parse(sessionString);
} catch (e) {
	console.warn(e);
}

export function getUserSession() {
	return userSession;
}

export function setUserSession(newSession = {}) {
	if (_.isEmpty(newSession)) {
		localStorage.removeItem('userSession');
	} else {
		// TODO: add timestamp (equals to the session's expiration date) to the localstorage record (in adition to the server check)
		localStorage.setItem('userSession', JSON.stringify(newSession));
	}
	window.dispatchEvent(new CustomEvent('sessionChanged', { detail: newSession }));

	return (userSession = newSession);
}

const UserSessionProvider = ({ children }) => {
	const [userSession, setUserSession] = useState(getUserSession());
	useEffect(() => {
		const onSessionChanged = event => {
			setUserSession(event.detail);
		};
		window.addEventListener('sessionChanged', onSessionChanged);
		return () => {
			window.removeEventListener('sessionChanged', onSessionChanged);
		};
	}, []);

	return <UserSessionContext.Provider value={userSession}>{Children.only(children)}</UserSessionContext.Provider>;
};

export default memo(UserSessionProvider);
