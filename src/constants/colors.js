// Todas as cores do app ficam reunidas neste único arquivo.
//
// Por quê? Porque se cada tela escrevesse '#E51C44' (o vermelho da marca)
// diretamente no seu StyleSheet, e um dia esse vermelho mudasse, seria
// preciso caçar e trocar essa string em vários arquivos. Aqui, é uma
// linha só. Cada tela/componente importa "colors" e usa colors.primary,
// nunca a cor "crua".
//
// Os valores foram tirados direto do protótipo do Figma.
export const colors = {
  background: '#0E1445', // fundo padrão das telas internas (Home, Detalhes, Agendar)
  loginBackground: '#0C123B', // fundo da tela de Login (igual à base da imagem do lutador)
  header: '#181F5E', // fundo do cabeçalho das telas internas
  card: '#1B2266', // fundo dos "cartões" (categoria, item da lista, avatar)
  border: '#2D3699', // borda fina desses cartões
  primary: '#E51C44', // vermelho da marca: botões, destaques, categoria selecionada
  success: '#04D361', // verde: usado para indicar "Disponível" e "Anfitrião"
  text: '#E1E1E6', // texto principal (branco levemente acinzentado)
  muted: '#A5A9D6', // texto secundário, menos importante que o principal
  icon: '#6B74C8', // cor de ícones "neutros" (não selecionados)
  placeholder: '#5F67B0', // cor do texto de placeholder nos campos de input
};
