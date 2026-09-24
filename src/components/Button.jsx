import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';

/**
 * Botão vermelho padrão do app. É o mesmo componente usado no Login
 * ("Entrar com Discord") e nos Detalhes ("Entrar na partida") — por isso
 * ele foi tirado da tela e virou um componente: assim garantimos que os
 * dois botões tenham exatamente a mesma aparência, e se um dia o estilo
 * do botão mudar, muda nos dois lugares de uma vez só.
 *
 * @param {string} title - texto que será renderizado
 * @param {function} handleFunction - função pro botão disparar
 * @param {number} [icon] - imagem opcional (ex: require('.../discord.png')) mostrada à esquerda do texto
 * @param {object} [style] - estilos extras aplicados por fora (ex: marginTop diferente em cada tela)
 * @example
 * <Button title='Salvar' handleFunction={function} />
 * @example
 * <Button title='Entrar com Discord' icon={require('../../assets/images/discord.png')} handleFunction={function} />
 * @returns
 */
export default function Button({ handleFunction, title, icon, style }) {
    return (
        <TouchableOpacity
            style={[styles.btn, style]}
            onPress={handleFunction}
            activeOpacity={0.8}
        >
            {/* O ícone é opcional: só tem essa caixinha da esquerda
                quando passar a prop "icon". Sem isso, o botão
                "Salvar" (que não tem ícone) ficaria com um espaço vazio à
                esquerda por nada. */}
            {icon && (
                <View style={styles.iconBox}>
                    <Image source={icon} style={styles.icon} resizeMode="contain" />
                </View>
            )}
            <Text style={styles.label}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        height: 56, // altura
        backgroundColor: colors.primary,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden', // mantém o ícone dentro do arredondamento do botão
    },
    iconBox: {
        width: 56,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.2)', // linha fina separando o ícone do texto
    },
    icon: { width: 24, height: 18 },
    label: {
        flex: 1,
        textAlign: 'center', // centraliza o texto no espaço que sobra (descontando o ícone)
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
})
