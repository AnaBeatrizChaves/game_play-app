import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import Button from '../components/Button';
import { colors } from '../constants/colors';

// As imagens do fundo (o lutador e as listras vermelhas atrás dele) e o
// logo do Discord usado dentro do botão.
const HERO = require('../../assets/images/login-hero.png'); // 374x304 - lutador com degradê já embutido na base
const STRIPES = require('../../assets/images/login-stripes.png'); // 375x360 - listras vermelhas do fundo
const DISCORD = require('../../assets/images/discord.png');

/**
 * Tela de Login. Não recebe nenhuma prop "customizada": o React Navigation
 * já entrega "navigation" automaticamente pra todo componente registrado
 * como <Stack.Screen component={Login} /> no App.js.
 *
 * @param {object} navigation - objeto do React Navigation usado pra trocar de tela
 */
export default function Login({ navigation }) {
  // useWindowDimensions devolve a largura atual da tela do celular.
  // O Figma foi desenhado pensando numa tela de 375px de largura, então
  // dividi a largura real por 375 pra saber a "escala" — se o celular
  // for maior ou menor que isso, o topo do lutador e das listras
  // acompanham o tamanho da tela, em vez de ficar com um valor fixo em
  // pixels que ficaria errado em telas diferentes.
  const { width } = useWindowDimensions();
  const scale = width / 375;

  function entrarComDiscord() {
    Haptics.selectionAsync(); // pequena vibração de feedback ao tocar
    // "replace" (em vez de "navigate") troca o Login pela Home na pilha
    // de navegação, sem deixar o Login guardado por baixo. Ou seja: se o
    // usuário apertar "voltar" estando na Home, o app NÃO volta pro
    // Login — o que faz sentido, já que depois de entrar não tem por
    // que voltar pra tela de login.
    navigation.replace('Home');
  }

  return (
    <View style={styles.container}>
      {/* As duas imagens ficam posicionadas de forma absoluta, uma por
          cima da outra: primeiro as listras (mais ao fundo), depois o
          lutador (por cima). A ordem em que aparecem no JSX é a ordem
          de empilhamento na tela. */}
      <Image
        source={STRIPES}
        resizeMode="contain"
        style={[styles.art, { top: 100 * scale, height: 360 * scale }]}
      />
      <Image
        source={HERO}
        resizeMode="contain"
        style={[styles.art, { top: 110 * scale, height: 304 * scale }]}
      />

      <SafeAreaView edges={['bottom']} style={styles.content}>
        <Text style={styles.title}>Conecte-se{'\n'}e organize suas{'\n'}jogatinas</Text>
        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games{'\n'}favoritos com seus amigos
        </Text>

        <Button
          icon={DISCORD}
          title="Entrar com Discord"
          handleFunction={entrarComDiscord}
          style={styles.btn}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.loginBackground },
  art: { position: 'absolute', left: 0, width: '100%' },
  content: {
    flex: 1,
    justifyContent: 'flex-end', // texto e botão "grudados" na parte de baixo da tela
    paddingHorizontal: 24,
    paddingBottom: 150, // altura do titulo e subtitulo
  },
  title: {
    color: colors.text,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 16,
  },
  btn: { marginTop: 40, marginHorizontal: 24 },
});
