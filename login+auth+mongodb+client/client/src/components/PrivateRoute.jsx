import _ from 'lodash';
import React, { memo, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserSessionContext } from './UserSessionProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const userSession = useContext(UserSessionContext);
	return (
		<Route
			{...rest}
			render={props => {
				const to = { pathname: '/login', search: `?redirect=${props.location.pathname}` };
				return _.isEmpty(userSession) ? <Redirect to={to} /> : <Component {...props} />;
			}}
		/>
	);
};

export default memo(PrivateRoute);
