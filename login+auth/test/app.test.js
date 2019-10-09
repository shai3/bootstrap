import server from "../src/server";

const testUser = {
  email: "shai32@gmail.com",
  password: "123"
};

describe("test app", () => {
  it("login with invalid user", async () => {
    const loginResponse = await server.inject({
      method: "POST",
      url: "/login",
      payload: { email: testUser.emali, password: "456" }
    });
    expect(loginResponse.statusCode).toBe(422);
    // login should return the user in response
  });

  it("login with valid fields and get protected users", async () => {
    const { email, password } = testUser;

    const loginResponse = await server.inject({
      method: "POST",
      url: "/login",
      payload: { email, password }
    });
    expect(loginResponse.statusCode).toBe(200);
    // login should return the user in response
    expect(loginResponse.result).toEqual({
      token: expect.any(String)
    });

    const url = "/user-urls-private";
    await expect(server.inject({ method: "GET", url })).resolves.toHaveProperty(
      "statusCode",
      401
    );

    // accessing user-urls route with a valid token (retrieved from login) should be valid;
    const headers = { Authorization: loginResponse.result.token };
    const result = await server.inject({ method: "GET", url, headers });
    await expect(result.statusCode).toEqual(200);
    await expect(result.payload).toEqual(JSON.stringify(["url1", "url2", 12]));
  });

  it("get public users", async () => {
    const url = "/user-urls";
    const result = await server.inject({ method: "GET", url });
    await expect(result.statusCode).toEqual(200);
    await expect(result.payload).toEqual(
      JSON.stringify(["url1", "url2", "public"])
    );
  });
});
