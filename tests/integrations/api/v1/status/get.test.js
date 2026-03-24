test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.dependecies.database).toBeDefined();

  const { version, opened_connections, max_connections } =
    responseBody.dependecies.database;

  expect(typeof version).toBe("string");
  expect(version).toBe("16.0");

  expect(typeof opened_connections).toBe("number");
  expect(opened_connections).toBe(1);

  expect(typeof max_connections).toBe("number");
  expect(max_connections).toBe(100);

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toBe(parsedUpdateAt);
});
