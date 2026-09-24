// Dados "fictícios" do app: como ainda não existe um back-end de verdade,
// as informações de usuário, categorias e partidas ficam guardadas aqui,
// em vez de espalhadas pelas telas. Se um dia isso virasse uma chamada de
// API de verdade, só este arquivo mudaria — nenhuma tela precisaria saber
// a diferença.

// Usuário logado (usado no cabeçalho da Home).
export const USER = {
  name: 'Bia',
  avatar: require('../../assets/images/perfil.png'),
};

// As 3 categorias fixas do app. O "id" de cada uma é usado em dois lugares:
// para comparar com match.category (saber a categoria de uma partida) e
// como chave em CATEGORY_ICONS (buscar o ícone certo).
export const CATEGORIES = [
  { id: 'ranked', label: 'Ranqueada', short: 'Ranqueada' },
  { id: 'duel', label: 'Duelo 1x1', short: '1x1' },
  { id: 'fun', label: 'Diversão', short: 'Diversão' },
];

// Jogadores usados em todas as partidas de exemplo (para não repetir os
// mesmos 3 objetos 5 vezes, um por partida).
const PLAYERS = [
  { id: '1', name: 'Tiago Luchtenberg', status: 'available', avatar: 'https://i.pravatar.cc/100?img=12' },
  { id: '2', name: 'Rodrigo Gonçalves', status: 'busy', avatar: 'https://i.pravatar.cc/100?img=15' },
  { id: '3', name: 'Diego Fernandes', status: 'busy', avatar: 'https://i.pravatar.cc/100?img=33' },
];

// Lista inicial de partidas agendadas, exibida na Home assim que o app abre.
// Cada partida guarda "gameKey" (não a imagem em si) — é essa chave que a
// tela usa para buscar a imagem certa em GAME_IMAGES (veja images.js).
export const MATCHES = [
  {
    id: '1',
    name: 'Lendários',
    game: 'League of Legends',
    gameKey: 'lol',
    category: 'ranked',
    date: '18/06 às 21:00h',
    role: 'host',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    players: PLAYERS,
  },
  {
    id: '2',
    name: 'Yeah, boy',
    game: 'Red Dead Redemption 2',
    gameKey: 'rdr2',
    category: 'fun',
    date: '23/06 às 19:00h',
    role: 'guest',
    description: 'Vamos cavalgar e causar confusão pelo velho oeste',
    players: PLAYERS,
  },
  {
    id: '3',
    name: 'Rumo ao topo',
    game: 'Counter-Strike',
    gameKey: 'csgo',
    category: 'duel',
    date: '20/06 às 09:00h',
    role: 'host',
    description: 'Duelo de AWP até alguém desistir',
    players: PLAYERS,
  },
  {
    id: '4',
    name: 'Bora queimar tudo',
    game: 'Apex Legends',
    gameKey: 'apex',
    category: 'ranked',
    date: '20/06 às 14:20h',
    role: 'host',
    description: 'Subir de rank hoje, sem desculpas',
    players: PLAYERS,
  },
  {
    id: '5',
    name: 'Valorosos',
    game: 'Valorant',
    gameKey: 'valorant',
    category: 'fun',
    date: '18/06 às 21:00h',
    role: 'host',
    description: 'Partidas casuais para relaxar com a galera',
    players: PLAYERS,
  },
];

// Servidor fixo mostrado na tela de Agendar ("Valorosos").
export const SELECTED_SERVER = MATCHES[4];
