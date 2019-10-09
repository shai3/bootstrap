import './config';
import server from '../src/server';
import db from '../src/db';

beforeAll(async () => {
	await db.then(d => d.dropDatabase());
	await server.init();
});

afterAll(() => server.stop());
