test("GET to api/v1/status deve retornar 200", async () => {
  const response = await fetch("https://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
