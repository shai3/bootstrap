import React, { useContext, memo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { UserSessionContext, setUserSession } from '../../UserSessionProvider';

const AuthTopBar = ({ className }) => {
	const { userDisplayName } = useContext(UserSessionContext);

	return (
		<div className={className}
		>
			<Box flex direction="row" pad={{ horizontal: 'small' }}>
				<NavLink to="home">
					<Text margin={{ horizontal: 'small' }}>Home</Text>
				</NavLink>
				<NavLink to="urls">
					<Text margin={{ horizontal: 'small' }}>Urls</Text>
				</NavLink>
			</Box>
			<Text margin={{ horizontal: 'small' }}>{userDisplayName}</Text>
			<Button
				style={{ color: 'white', marginRight: 20 }}
				onClick={() => {
					setUserSession(null);
				}}
				secondary
				label="logout"
			/>
		</div>
	);
};

export default styled(memo(AuthTopBar))`
	 {
		width: 100%;
		min-height: 72px;
		color: white;
		justify-content: end;
		align-content: center;
		flex-direction: row;
		background: black;
		padding: 10px 20px
		font-size: 36px;
		letter-spacing: 6px;
	}

	a span {
		color: white;
	}
`;
