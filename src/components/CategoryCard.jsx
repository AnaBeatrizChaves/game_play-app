import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { CATEGORY_ICONS } from '../constants/images';

/**
 * Card de categoria (Ranqueada / Duelo 1x1 / Diversão). Ele é usado em
 * duas telas — Home (pra filtrar a lista de partidas) e Agendar (pra
 * escolher a categoria da nova partida) — por isso virou um componente
 * em vez de ser desenhado direto dentro das duas telas.
 *
 * O card sabe desenhar a si mesmo, mas não sabe NADA sobre o que
 * acontece quando é tocado — quem decide isso é a tela que o usa,
 * através da prop "onPress". Esse é o mesmo princípio do Button: o
 * componente só cuida da aparência, e quem usa o componente cuida do
 * comportamento.
 *
 * @param {object} category - objeto de categoria vindo de CATEGORIES (precisa ter id e label)
 * @param {boolean} selected - true quando esta categoria é a selecionada no momento (muda a borda/fundo do card)
 * @param {function} onPress - função chamada ao tocar no card
 * @param {boolean} [showDot] - mostra um quadradinho no canto (só é usado na tela Agendar)
 * @example
 * <CategoryCard category={item} selected={category === item.id} onPress={() => setCategory(item.id)} />
 * @returns
 */
export default function CategoryCard({ category, selected, onPress, showDot }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      {showDot && <View style={[styles.dot, selected && styles.dotSelected]} />}

      {/* O ícone é sempre colorido, ele não fica cinza quando a categoria
          NÃO está selecionada — só a borda e o fundo do card mudam de
          cor. Conforme o protótipo do Figma. */}
      <Image source={CATEGORY_ICONS[category.id]} style={styles.icon} resizeMode="contain" />
      <Text style={styles.label}>{category.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 126,
    height: 142,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#242E85',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  dotSelected: { backgroundColor: colors.primary },
  icon: { width: 52, height: 52 },
  label: { color: colors.text, fontSize: 14, fontWeight: 'bold' },
});
