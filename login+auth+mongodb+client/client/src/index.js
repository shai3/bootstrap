import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

if (process.env.NODE_ENV === 'developmentd') {
	const { whyDidYouUpdate } = require('why-did-you-update');
	whyDidYouUpdate(React);
}
render(React.createElement(App), document.getElementById('root'));
