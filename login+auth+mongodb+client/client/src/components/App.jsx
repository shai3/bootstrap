import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import history from '../history';
import UserSessionProvider from './UserSessionProvider';
import RedirectIfAuthenticatedRoute from './RedirectIfAuthenticatedRoute';
import LoginPage from './Screens/LoginPage';
import RegisterPage from './Screens/RegisterPage';
import HomePage from './Screens/HomePage';
import UserUrlsPage from './Screens/UserUrlsPage';
import PrivateRoute from './PrivateRoute';
const GlobalStyle = createGlobalStyle`html, body { overflow: hidden; }`;

export default () => (
	<UserSessionProvider>
		<GlobalStyle />
		<Router history={history}>
			<Switch>
				<RedirectIfAuthenticatedRoute exact path="/register" component={RegisterPage} />
				<RedirectIfAuthenticatedRoute exact path={['/', '/login']} component={LoginPage} />
				{/*<RedirectIfAuthenticatedRoute exact path={['/', '/login']} component={GuestApp} />*/}
				{/*<Route exact path="/about" component={About} />*/}
				{/*<Route exact path="/registerEmailSent" component={RegisterEmailSent} />*/}
				<PrivateRoute path="/home" component={HomePage} />
				<PrivateRoute path="/urls" component={UserUrlsPage} />
			</Switch>
		</Router>
	</UserSessionProvider>
);
