import { createBrowserHistory } from 'history';
import _ from 'lodash';

const history = createBrowserHistory();
const { push, replace } = history;

const updateLocation = ({ relativePath, ...args }) => {
	if (relativePath) {
		args.pathname = `${_.trimEnd(history.location.pathname, '/')}/${relativePath}`;
	}
	push(_.defaults(args, history.location));
};

export default history;
export { push, replace, updateLocation };
