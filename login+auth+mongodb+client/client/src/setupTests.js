import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Interceptor from 'nock/lib/interceptor';
import 'jest-enzyme';

// Monkey patch Nock to add support for boom
Interceptor.prototype.replyWithBoom = function({ output }) {
	return this.reply(output.statusCode, output.payload, output.headers);
};

Enzyme.configure({ adapter: new Adapter() });
