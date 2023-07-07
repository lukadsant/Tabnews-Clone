function Home() {
    if (typeof window !== 'undefined') {
      // Obter informações sobre o visitante
      const navegador = window.navigator.userAgent; // Nome do navegador
      const plataforma = window.navigator.platform; // Plataforma do sistema operacional
      const idioma = window.navigator.language; // Idioma do navegador
      const larguraTela = window.innerWidth; // Largura da tela em pixels
      const alturaTela = window.innerHeight; // Altura da tela em pixels
  
      // Exibir as informações do visitante
      return `<h1>Bem-vindo visitante!</h1>
              <p>Seu navegador é: ${navegador}</p>
              <p>Sistema operacional: ${plataforma}</p>
              <p>Idioma: ${idioma}</p>
              <p>Largura da tela: ${larguraTela}px</p>
              <p>Altura da tela: ${alturaTela}px</p>`;
    } else {
      // Caso não esteja em um ambiente de navegador
      return '<h1>Bem-vindo visitante!</h1><p>Desculpe, não foi possível obter informações do visitante neste ambiente.</p>';
    }
  }
  
export default Home;