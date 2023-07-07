function Home() {

    const navegador = window.navigator.userAgent; // Nome do navegador
    const plataforma = window.navigator.platform; // Plataforma do sistema operacional
    const idioma = window.navigator.language; // Idioma do navegador
    const larguraTela = window.innerWidth; // Largura da tela em pixels
    const alturaTela = window.innerHeight; // Altura da tela em pixels

    return `<h1>Bem-vindo visitante!</h1>
            <p>Seu navegador é: ${navegador}</p>
            <p>Sistema operacional: ${plataforma}</p>
            <p>Idioma: ${idioma}</p>
            <p>Largura da tela: ${larguraTela}px</p>
            <p>Altura da tela: ${alturaTela}px</p>`;
  }
  