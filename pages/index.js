/* eslint-disable camelcase */

import { useEffect, useState } from "react";
import Image from "next/image";

function getBrowserName(userAgent) {
  const browsers = {
    Chrome: /Chrome\/([0-9]+)/,
    Firefox: /Firefox\/([0-9]+)/,
    Safari: /Version\/([0-9]+).*Safari/,
    Edge: /Edg\/([0-9]+)/,
    Opera: /Opera\/([0-9]+)/,
    InternetExplorer: /MSIE|Trident/,
  };

  for (const [browserName, pattern] of Object.entries(browsers)) {
    const match = userAgent.match(pattern);
    if (match) {
      return browserName;
    }
  }

  return "Unknown";
}

function Home() {
  const [visitorInfo, setVisitorInfo] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window);
      const userAgent = window.navigator.userAgent;
      const plataforma = window.navigator.platform;
      const idioma = window.navigator.language;
      const larguraTela = window.innerWidth;
      const alturaTela = window.innerHeight;
      const navegador = getBrowserName(userAgent);

      const connectionType = navigator.connection
        ? navigator.connection.type
        : "Unknown";
      const connectionSpeed = navigator.connection
        ? navigator.connection.downlink
        : "Unknown";
      const horarioLocal = new Date().toLocaleString();
      const fusoHorario = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const estaOnline = navigator.onLine;
      const resolucaoTotal = `${window.screen.width}x${window.screen.height}`;
      const profundidadeCor = window.screen.colorDepth;
      const cpus = navigator.hardwareConcurrency || "Desconhecido";
      const ram = navigator.deviceMemory || "Desconhecido";
      const isMobile = /Mobi/i.test(navigator.userAgent);
      const aceitaCookies = navigator.cookieEnabled; // Adiciona definição de aceitaCookies
      navigator.permissions
        ?.query({ name: "geolocation" })
        .then((result) => {
          const permissaoGeolocalizacao = result.state;

          // 👾 WebGL – info da GPU
          let infoGPU = "Desconhecido";
          try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            if (gl) {
              infoGPU = gl.getParameter(gl.RENDERER);
            }
          } catch (error) {
            infoGPU = "Não suportado";
          }

          setVisitorInfo({
            navegador,
            plataforma,
            idioma,
            larguraTela,
            alturaTela,
            connectionType,
            connectionSpeed,
            horarioLocal,
            fusoHorario,
            estaOnline,
            aceitaCookies,
            resolucaoTotal,
            profundidadeCor,
            cpus,
            ram,
            isMobile,
            permissaoGeolocalizacao,
            infoGPU,
          });
        })
        .catch(() => {
          // fallback se não conseguir checar permissões
          setVisitorInfo({
            navegador,
            plataforma,
            idioma,
            larguraTela,
            alturaTela,
            connectionType,
            connectionSpeed,
            horarioLocal,
            fusoHorario,
            estaOnline,
            aceitaCookies,
            resolucaoTotal,
            profundidadeCor,
            cpus,
            ram,
            isMobile,
            permissaoGeolocalizacao: "Desconhecido",
            infoGPU: "Desconhecido",
          });
        });
    }
  }, []);

  if (visitorInfo) {
    console.log(visitorInfo);
    return (
      <div>
        <h1>Bem-vindo visitante!</h1>
        <Image
          src="https://media.giphy.com/media/czvoPCnFyjh6w/giphy.gif"
          alt="BMO DANCING"
          width={500}
          height={300}
        />
        <br />
        <p>
          Você sabia que os navegadores compartilham por padrão algumas
          informações básicas?
        </p>
        <p>
          Essas são algumas informações suas que estão acessíveis através do
          objeto window.navigator:
        </p>
        <br />
        <p>Seu navegador é baseado em: {visitorInfo.navegador}</p>
        <p>Sistema operacional: {visitorInfo.plataforma}</p>
        <p>Idioma: {visitorInfo.idioma}</p>
        <p>Largura da tela: {visitorInfo.larguraTela}px</p>
        <p>Altura da tela: {visitorInfo.alturaTela}px</p>
        <p>Tipo de conexão: {visitorInfo.connectionType}</p>
        <p>Velocidade da conexão: {visitorInfo.connectionSpeed} Mbps</p>
        <p>Horário local: {visitorInfo.horarioLocal}</p>
        <p>Fuso horário: {visitorInfo.fusoHorario}</p>
        <p>Você está online? {visitorInfo.estaOnline ? "Sim" :
          "Não"}</p>
        <p>Você aceita cookies? {visitorInfo.aceitaCookies ? "Sim" : "Não"}</p>
        <p>Resolução total da tela: {visitorInfo.resolucaoTotal}</p>
        <p>Profundidade de cor: {visitorInfo.profundidadeCor}-bit</p>
        <p>Quantidade de CPUs: {visitorInfo.cpus}</p>
        <p>Memória RAM: {visitorInfo.ram} GB</p>
        <p>
          Você está acessando este site de um dispositivo {visitorInfo.isMobile ? "móvel" : "desktop"}.
        </p>
        <p>
          Permissão de geolocalização: {visitorInfo.permissaoGeolocalizacao}
        </p>
        <p>
          Informações da GPU: {visitorInfo.infoGPU}
        </p>
        <p>
          Você está acessando este site de um dispositivo{" "}
          {visitorInfo.isMobile ? "móvel" : "desktop"}.
        </p>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Bem-vindo visitante!</h1>
        <p>
          Nossa, Eu iria ti impressionar com um monte de dados básico que a
          conexão da internet disponibiliza, mais... parece que você está
          utilizando alguma coisa estranha... seria uma geladeira?
        </p>
      </div>
    );
  }
}

export default Home;
