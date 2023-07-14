import { useEffect, useState } from 'react';

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

  return 'Unknown';
}

function Home() {
  const [visitorInfo, setVisitorInfo] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(window)
      const userAgent = window.navigator.userAgent;
      const plataforma = window.navigator.platform;
      const idioma = window.navigator.language;
      const larguraTela = window.innerWidth;
      const alturaTela = window.innerHeight;
      const navegador = getBrowserName(userAgent);

      const connectionType = navigator.connection ? navigator.connection.type : 'Unknown';
      const connectionSpeed = navigator.connection ? navigator.connection.downlink : 'Unknown';

      setVisitorInfo({
        navegador,
        plataforma,
        idioma,
        larguraTela,
        alturaTela,
        connectionType,
        connectionSpeed,
      });
    }
  }, []);

  if (visitorInfo) {
    console.log(visitorInfo)
    return (
      <div>
        <h1>Bem-vindo visitante!</h1>
        <img src="https://media.giphy.com/media/czvoPCnFyjh6w/giphy.gif" alt="BMO DANCING"></img>
        <br />
        <p>Você sabia que os navegadores compartilham por padrão algumas informações básicas?</p>
        <p>Essas são algumas informações suas que estão acessíveis através do objeto window.navigator:</p>
        <br />
        <p>Seu navegador é baseado em: {visitorInfo.navegador}</p>
        <p>Sistema operacional: {visitorInfo.plataforma}</p>
        <p>Idioma: {visitorInfo.idioma}</p>
        <p>Largura da tela: {visitorInfo.larguraTela}px</p>
        <p>Altura da tela: {visitorInfo.alturaTela}px</p>
        <p>Tipo de conexão: {visitorInfo.connectionType}</p>
        <p>Velocidade da conexão: {visitorInfo.connectionSpeed} Mbps</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Bem-vindo visitante!</h1>
        <p>Nossa, Eu iria ti impressionar com um monte de dados básico que a conexão da internet disponibiliza, mais... parece que você está utilizando alguma coisa estranha... seria uma geladeira?</p>
      </div>
    );
  }
}

export default Home;