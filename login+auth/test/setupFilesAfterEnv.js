import "./config.js";
import server from "../src/server.js";

beforeAll(async () => {
  await server.init();
});

afterAll(() => server.stop());
