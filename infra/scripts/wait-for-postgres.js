const { exec } = require("node:child_process");

function checkPostgresConnection() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(stdout) {
    if (stdout.search("accepting connections") == -1) {
      process.stdout.write(".");
      checkPostgresConnection();
      return;
    }
    console.log("\n🟢 Postgres is ready\n");
  }
}

process.stdout.write("\n\n🔴 Waiting for postgres...");

checkPostgresConnection();
