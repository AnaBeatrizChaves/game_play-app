import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { GAME_IMAGES } from '../constants/images';
import { CATEGORIES } from '../constants/mock';

/**
 * Uma linha da lista de "Partidas agendadas" na Home: a imagem do jogo,
 * o nome da partida, a categoria, a data e se o usuário é anfitrião ou
 * visitante. Cada partida da lista renderiza um MatchItem — extrair isso
 * pra um componente deixa o `renderItem` do FlatList da Home bem curto
 * e fácil de ler (só "aqui vai um MatchItem", em vez de umas 30 linhas
 * de JSX dentro do próprio `renderItem`).
 *
 * @param {object} match - a partida a ser exibida (um item de MATCHES)
 * @param {function} onPress - função chamada ao tocar na linha (normalmente abre os Detalhes)
 * @example
 * <MatchItem match={item} onPress={() => navigation.navigate('ServerDetails', { id: item.id })} />
 * @returns
 */
export default function MatchItem({ match, onPress }) {
  const isHost = match.role === 'host';
  const roleColor = isHost ? colors.primary : colors.success;

  // Precisa do "short" da categoria (ex: "1x1" em vez de "Duelo 1x1")
  // pra caber no espaço pequeno ao lado do nome da partida. Por isso
  // busca o objeto completo da categoria em CATEGORIES, usando o
  // match.category (que guarda só o id, tipo 'ranked') como chave.
  const category = CATEGORIES.find((c) => c.id === match.category);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <Image source={GAME_IMAGES[match.gameKey]} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{match.name}</Text>
          <Text style={styles.category}>{category?.short}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.info}>
            <MaterialCommunityIcons name="calendar-blank" size={16} color={colors.primary} />
            <Text style={styles.date}>{match.date}</Text>
          </View>

          <View style={styles.info}>
            <MaterialCommunityIcons name="account" size={16} color={roleColor} />
            <Text style={[styles.role, { color: roleColor }]}>
              {isHost ? 'Anfitrião' : 'Visitante'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12 },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  content: {
    flex: 1,
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { flex: 1, color: colors.text, fontSize: 18, fontWeight: 'bold' },
  category: { color: colors.muted, fontSize: 14 },
  info: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  date: { color: colors.text, fontSize: 14 },
  role: { fontSize: 14 },
});
