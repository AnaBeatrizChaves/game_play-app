import { Alert, FlatList, Image, ImageBackground, Linking, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import Button from '../components/Button';
import ScreenHeader from '../components/ScreenHeader';
import { colors } from '../constants/colors';
import { GAME_IMAGES } from '../constants/images';

const DISCORD = require('../../assets/images/discord.png');

// Cor e texto exibidos ao lado de cada jogador, de acordo com o status dele.
const STATUS = {
  available: { label: 'Disponível', color: colors.success },
  busy: { label: 'Ocupado', color: colors.primary },
};

/**
 * Tela de Detalhes do servidor. "route.params.id" é o id da partida que
 * foi tocada na Home (veja MatchItem em Home.jsx); "matches" é a lista
 * completa, recebida como prop extra vinda do App.js — é comparando essas
 * duas coisas que a tela descobre QUAL partida deve mostrar.
 *
 * @param {object} navigation - objeto do React Navigation
 * @param {object} route - contém route.params.id, o id da partida escolhida
 * @param {object[]} matches - lista completa de partidas (vem do App.js)
 */
export default function ServerDetails({ navigation, route, matches }) {
  const { id } = route.params;
  const match = matches.find((m) => m.id === id);

  // Guarda de segurança: se por algum motivo o id não bater com nenhuma
  // partida, evita que o app quebre tentando ler propriedades de "undefined".
  if (!match) return null;

  function compartilhar() {
    Share.share({ message: `Bora jogar ${match.game}? Entra na partida "${match.name}"!` });
  }

  function entrarNaPartida() {
    Haptics.selectionAsync();
    Linking.openURL('https://discord.com/app').catch(() =>
      Alert.alert('Não foi possível abrir o Discord')
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Detalhes"
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity onPress={compartilhar} hitSlop={12}>
            <MaterialCommunityIcons name="share-variant" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={match.players}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <ImageBackground source={GAME_IMAGES[match.gameKey]} style={styles.banner} resizeMode="cover">
              <LinearGradient colors={['transparent', colors.background]} style={styles.bannerContent}>
                <Text style={styles.title}>{match.name}</Text>
                <Text style={styles.description}>{match.description}</Text>
              </LinearGradient>
            </ImageBackground>

            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Jogadores</Text>
              <Text style={styles.total}>Total {match.players.length}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => {
          const status = STATUS[item.status];
          return (
            <View style={styles.player}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />

              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{item.name}</Text>
                <View style={styles.status}>
                  <View style={[styles.statusDot, { backgroundColor: status.color }]} />
                  <Text style={styles.statusLabel}>{status.label}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Button icon={DISCORD} title="Entrar na partida" handleFunction={entrarNaPartida} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingBottom: 16 },
  banner: { height: 234, backgroundColor: colors.card },
  bannerContent: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 24, paddingBottom: 24 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  description: { color: colors.text, fontSize: 14, lineHeight: 20, marginTop: 8 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
  },
  listTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  total: { color: colors.muted, fontSize: 14 },
  player: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingLeft: 24, paddingVertical: 10 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  playerInfo: {
    flex: 1,
    gap: 6,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  playerName: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  status: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusLabel: { color: colors.muted, fontSize: 14 },
  footer: { paddingHorizontal: 24, paddingBottom: 16 },
});
