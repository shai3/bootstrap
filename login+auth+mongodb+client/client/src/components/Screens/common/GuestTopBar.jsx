import React, { memo } from 'react';
import styled from 'styled-components';
import { Box } from 'grommet/components/Box/index';
import { Button } from 'grommet/components/Button/index';
import history from '../../../history';

const GuestTopBar = ({ className }) => (
		<Box
			className={className}
			tag="header"
			direction="row"
			align="center"
			background="black"
			basis="auto"
			pad={{ between: 'small', horizontal: 'medium' }}
			justify="end"
		>
			<Box flex direction="row" pad={{ horizontal: 'small' }}>
				RTSP
			</Box>
			<Button
				style={{ color: 'white', marginRight: 20 }}
				onClick={() => history.push(`/login`)}
				secondary
				label="login"
			/>
			<Button onClick={() => history.push(`/register`)} primary label="register" />
		</Box>
);

export default styled(memo(GuestTopBar))`
	{
		width: 100%;
		min-height: 72px;
		color: white;
		font-size: 36px;
		letter-spacing: 6px;
	}
`;
