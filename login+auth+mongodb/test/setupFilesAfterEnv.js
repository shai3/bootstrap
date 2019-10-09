import "./config.js";
import server from "../src/server.js";
import db from "../src/db/index.js";

beforeAll(async () => {
  await db.then(d => d.dropDatabase());
  await server.init();
});

afterAll(() => server.stop());
