// Este arquivo só existe para resolver um problema técnico do React Native:
// o require('./algumaImagem.png') PRECISA ser escrito de forma "literal"
// (o Metro, empacotador do Expo, procura essas chamadas no código antes
// mesmo de rodar o app). Ou seja, não dá pra fazer
// require('./' + nomeDoJogo + '.png') dentro de um componente.
//
// A solução mais simples é: fazer todos os requires aqui, uma única vez,
// e guardar o resultado em um objeto comum. Aí sim, em qualquer tela,
// dá pra escolher a imagem certa dinamicamente com CATEGORY_ICONS[id] ou
// GAME_IMAGES[gameKey] — só que a "escolha dinâmica" acontece DEPOIS que
// o require já rodou, então o Metro não reclama.

// Ícone de cada categoria (a imagem já vem colorida — ela NÃO muda de cor
// quando a categoria é selecionada, só a borda/fundo do card mudam).
export const CATEGORY_ICONS = {
  ranked: require('../../assets/images/icon-ranked.png'),
  duel: require('../../assets/images/icon-duel.png'),
  fun: require('../../assets/images/icon-fun.png'),
};

// Logo/arte de cada jogo. A mesma imagem é reaproveitada em dois lugares:
// na miniatura pequena da lista da Home e no banner grande dos Detalhes.
export const GAME_IMAGES = {
  lol: require('../../assets/images/game-lol.png'),
  rdr2: require('../../assets/images/game-rdr2.png'),
  csgo: require('../../assets/images/game-csgo.png'),
  apex: require('../../assets/images/game-apex.png'),
  valorant: require('../../assets/images/game-valorant.png'),
};
