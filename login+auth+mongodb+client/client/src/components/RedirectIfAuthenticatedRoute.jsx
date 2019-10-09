import _ from 'lodash';
import qs from 'qs';
import React, { memo, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserSessionContext } from './UserSessionProvider';

const RedirectIfAuthenticatedRoute = ({ component: Component, ...rest }) => {
	const userSession = useContext(UserSessionContext);
	return (
		<Route
			{...rest}
			render={props => {
				const search = qs.parse(props.location.search, { ignoreQueryPrefix: true });
				const pathname = _.get(search, 'redirect', '/home');
				return _.isEmpty(userSession) ? <Component {...props} /> : <Redirect to={{ pathname }} />;
			}}
		/>
	);
};

export default memo(RedirectIfAuthenticatedRoute);
