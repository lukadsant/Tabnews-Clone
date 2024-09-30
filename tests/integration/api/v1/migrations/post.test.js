import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("GET to api/v1/migrations deve retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();

  const migrationsResult = await database.query(
    "SELECT * FROM public.pgmigrations",
  );
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toEqual(migrationsResult.rows.length);
});
