import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <DatabaseStatus />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return <div>última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let databaseStatusText = "Carregando...";
  if (!isLoading && data) {
    databaseStatusText = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões Abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>
          Conexões Máximas: {data.dependencies.database.max_connections}
        </div>
      </>
    );
  }
  return (
    <>
      <h2>Banco de Dados</h2>
      {databaseStatusText}
    </>
  );
}
