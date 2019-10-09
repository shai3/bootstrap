import React, { memo } from 'react';
import { Box } from 'grommet/components/Box/index';
import { Grommet } from 'grommet-icons/icons/Grommet';

const Spinning = ({ color = 'brand', size = 'large', ...props }) => (
	<Box animation="pulse" align="center" justify="center" {...props}>
		<Grommet color={color} size={size} />
	</Box>
);

export default memo(Spinning);
