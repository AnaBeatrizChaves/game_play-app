import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

/**
 * Cabeçalho usado pelas duas telas "internas" da pilha de navegação
 * (Detalhes do servidor e Agendar): uma seta pra voltar, um título no
 * meio, e um espaço opcional à direita (nos Detalhes, esse espaço é
 * ocupado pelo ícone de compartilhar).
 *
 * Extrair isso pra um componente evita repetir a mesma View com seta +
 * título em dois arquivos diferentes — e garante que as duas telas
 * fiquem com a mesma altura de cabeçalho, a mesma cor de fundo, etc.
 *
 * @param {string} title - texto exibido no centro do cabeçalho
 * @param {function} onBack - função chamada ao tocar na seta (normalmente navigation.goBack())
 * @param {*} [right] - elemento (JSX) opcional a ser exibido no canto direito
 * @example
 * <ScreenHeader title='Detalhes' onBack={() => navigation.goBack()} />
 * @returns
 */
export default function ScreenHeader({ title, onBack, right }) {
  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onBack} hitSlop={12} style={styles.side}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        {/* Esta View da direita tem a mesma largura da seta da esquerda
            (styles.side), mesmo quando "right" não é passado. Isso é o
            que mantém o título perfeitamente centralizado — se não
            existisse essa View "fantasma", o título ficaria puxado pra
            esquerda (porque só teria a seta ocupando espaço de um lado). */}
        <View style={[styles.side, styles.sideRight]}>{right}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: colors.header },
  row: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  side: { width: 32 },
  sideRight: { alignItems: 'flex-end' },
  title: { color: colors.text, fontSize: 20, fontWeight: 'bold' },
});
