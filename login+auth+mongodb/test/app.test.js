import { collections } from "../src/db/index";
import server from "../src/server";

const testUser = {
  firstName: "testFirst",
  lastName: "testLast",
  email: "test@roggly.com",
  password: "a12345678E"
};

describe("test app", () => {
  it("Register with inValid fields", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/register",
      payload: { firstName: "name" }
    });

    expect(response.statusCode).toBe(422);
    expect(response.result).toEqual({
      details: {
        email: '"email" is required',
        lastName: '"lastName" is required',
        password: '"password" is required'
      },
      error: "Unprocessable Entity",
      message: "validationError",
      statusCode: 422
    });

    const response2 = await server.inject({
      method: "POST",
      url: "/register",
      payload: { firstName: "name", email: "12" }
    });
    expect(response2.statusCode).toBe(422);
    expect(response2.result).toEqual({
      details: {
        email: '"email" must be a valid email',
        lastName: '"lastName" is required',
        password: '"password" is required'
      },
      error: "Unprocessable Entity",
      message: "validationError",
      statusCode: 422
    });
  });

  it("Register with valid fields", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/register",
      payload: testUser
    });

    const { firstName, lastName, email } = testUser;
    expect(response.statusCode).toBe(200);
    expect(response.result).toEqual({
      token: expect.any(String),
      userDisplayName: `${firstName} ${lastName}`
    });

    const userCollections = await collections.users;
    const users = await userCollections.findOne();
    expect(users).toEqual({
      _id: expect.any(Object),
      firstName,
      lastName,
      email,
      urls: [],
      encodedPassword: expect.any(String)
    });

    await collections.users.then(c => c.drop());
  });

  it("login with valid fields", async () => {
    const registerResponse = await server.inject({
      method: "POST",
      url: "/register",
      payload: testUser
    });
    expect(registerResponse.statusCode).toBe(200);

    const { firstName, lastName, email, password } = testUser;

    const loginResponse = await server.inject({
      method: "POST",
      url: "/login",
      payload: { email, password }
    });
    expect(loginResponse.statusCode).toBe(200);
    // login should return the user in response
    expect(loginResponse.result).toEqual({
      token: expect.any(String),
      userDisplayName: `${firstName} ${lastName}`
    });

    const url = "/user-urls";
    // throw unauthorized Error when trying to access user-url without a valid token
    await expect(server.inject({ method: "GET", url })).resolves.toHaveProperty(
      "statusCode",
      401
    );

    // accessing user-urls route with a valid token (retrieved from login) should be valid;
    const headers = { Authorization: loginResponse.result.token };
    await expect(
      server.inject({ method: "GET", url, headers })
    ).resolves.toHaveProperty("statusCode", 200);
    await collections.users.then(c => c.drop());
  });

  it("test get and add user url", async () => {
    const registerResponse = await server.inject({
      method: "POST",
      url: "/register",
      payload: testUser
    });
    const headers = { Authorization: registerResponse.result.token };

    const userCollections = await collections.users;
    const url = "/user-urls";

    await server.inject({
      url,
      headers,
      method: "PUT",
      payload: { url: "rtsp://test" }
    });
    await expect(userCollections.findOne()).resolves.toHaveProperty("urls", [
      "rtsp://test"
    ]);

    await server.inject({
      url,
      headers,
      method: "PUT",
      payload: { url: "rtsp://test2" }
    });
    await expect(userCollections.findOne()).resolves.toHaveProperty("urls", [
      "rtsp://test",
      "rtsp://test2"
    ]);

    await server.inject({
      url,
      headers,
      method: "PUT",
      payload: { url: "rtsp://test" }
    });
    await expect(userCollections.findOne()).resolves.toHaveProperty("urls", [
      "rtsp://test",
      "rtsp://test2"
    ]);

    const getResponse = await server.inject({ method: "GET", url, headers });
    expect(getResponse.result).toEqual(["rtsp://test", "rtsp://test2"]);
    await collections.users.then(c => c.drop());
  });
});
