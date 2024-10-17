const { exec } = require("node:child_process");

function checkPostgresConnection() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (error) {
      console.error(`Erro ao executar o comando: ${error.message}`);
      return setTimeout(checkPostgresConnection, 1000); // Tentar novamente após um tempo
    }

    // Verificar se stderr tem alguma mensagem de erro
    if (stderr) {
      console.error(`Erro do processo: ${stderr}`);
      return setTimeout(checkPostgresConnection, 1000); // Tentar novamente após um tempo
    }

    // Garantir que stdout não seja nulo
    if (!stdout) {
      console.error("A resposta do comando está vazia.");
      return setTimeout(checkPostgresConnection, 1000); // Tentar novamente após um tempo
    }

    if (stdout.search("accepting connections") == -1) {
      process.stdout.write(".");
      setTimeout(checkPostgresConnection, 1000); // Tentar novamente após um tempo
      // checkPostgresConnection();
      // return;
    }
    console.log("\n🟢 Postgres is ready\n");
  }
}

process.stdout.write("\n\n🔴 Waiting for postgres...");

checkPostgresConnection();
