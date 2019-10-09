import React, { useState, memo, useRef } from 'react';
import styled from 'styled-components';
import { AuthTopBar, useInitialize } from './common';
import { getUserUrls } from '../../api/users';

const ListRow = styled('div')`
	display: flex;
	line-height: 30px;
	padding-left: 10px;
	font-size: 14px;
	flex-direction: row;
	justify-content: space-between;
	cursor: pointer;
	flex-shrink: 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	font-weight: normal;

	&:hover {
		background: #eeeeee;
	}
`;

const UserUrlsPage = () => {
	const [urls] = useInitialize(getUserUrls, []);
	return (
		<div style={{ display: 'auto' }}>
			<AuthTopBar />
			{urls && (
				<div style={{ overflow: 'auto' }}>
					{urls.map(url => (
						<ListRow key={url}>{url}</ListRow>
					))}
				</div>
			)}
		</div>
	);
};

export default memo(UserUrlsPage);
