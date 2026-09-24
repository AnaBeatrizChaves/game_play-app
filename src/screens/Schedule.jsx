import { useState } from 'react';
import {
  Alert, Image, KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import Button from '../components/Button';
import CategoryCard from '../components/CategoryCard';
import ScreenHeader from '../components/ScreenHeader';
import { colors } from '../constants/colors';
import { GAME_IMAGES } from '../constants/images';
import { CATEGORIES, SELECTED_SERVER } from '../constants/mock';

const MAX_DESCRIPTION = 100;

/**
 * Campo pequeno de 2 dígitos, usado 4 vezes nesta tela (dia, mês, hora e
 * minuto). Em vez de copiar e colar o mesmo TextInput com as mesmas 6
 * propriedades quatro vezes, ele virou este minicomponente local — como
 * só é usado aqui dentro do Agendar, nem precisa morar em src/components.
 *
 * @param {string} value - o texto atual do campo
 * @param {function} onChangeText - função chamada a cada dígito digitado
 */
function SmallInput({ value, onChangeText }) {
  return (
    <TextInput
      style={styles.smallInput}
      value={value}
      onChangeText={(text) => onChangeText(text.replace(/[^0-9]/g, ''))} // remove tudo que não for número
      keyboardType="number-pad"
      maxLength={2}
      textAlign="center"
      selectionColor={colors.primary}
    />
  );
}

/**
 * Tela de Agendar partida. Além de "navigation", recebe "addMatch" como
 * prop extra — uma função criada lá no App.js que adiciona uma partida na lista principal.
 *
 * Ao confirmar o agendamento, monta o objeto da nova partida e chama addMatch(...)
 * ANTES de voltar, então a lista que a Home exibe já vem atualizada.
 *
 * @param {object} navigation - objeto do React Navigation
 * @param {function} addMatch - função (vinda do App.js) que adiciona uma partida na lista
 */
export default function Schedule({ navigation, addMatch }) {
  const [category, setCategory] = useState(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  function selecionarCategoria(id) {
    Haptics.selectionAsync();
    // Diferente da Home (onde tocar de novo desmarca), aqui a categoria
    // é obrigatória pra agendar — então sempre define o valor, nunca
    // alterna de volta pra "nenhuma selecionada".
    setCategory(id);
  }

  function agendar() {
    const d = Number(day), m = Number(month), h = Number(hour), min = Number(minute);
    const dataValida = day && month && d >= 1 && d <= 31 && m >= 1 && m <= 12;
    const horaValida = hour && minute && h <= 23 && min <= 59;

    if (!category) return Alert.alert('Selecione uma categoria');
    if (!dataValida) return Alert.alert('Informe um dia e mês válidos');
    if (!horaValida) return Alert.alert('Informe um horário válido');

    // Monta o objeto da nova partida com o MESMO formato dos objetos que
    // já existem em constants/mock.js (mesmos campos: id, name, game,
    // gameKey, category, date, role, description, players). É importante
    // manter esse formato igual, porque MatchItem e ServerDetails esperam
    // encontrar esses campos em qualquer partida da lista, seja ela uma
    // das 5 de exemplo ou uma criada agora pelo usuário.
    //
    // O servidor (jogo, nome e lista de jogadores) vem sempre de
    // SELECTED_SERVER, a tela de Agendar sempre agenda uma partida
    // nesse mesmo servidor fixo.
    const novaPartida = {
      id: Date.now().toString(), // usamos o horário atual como id, só pra garantir que não repita
      name: SELECTED_SERVER.name,
      game: SELECTED_SERVER.game,
      gameKey: SELECTED_SERVER.gameKey,
      category,
      date: `${day.padStart(2, '0')}/${month.padStart(2, '0')} às ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}h`,
      role: 'host',
      description,
      players: SELECTED_SERVER.players,
    };

    addMatch(novaPartida); // avisa o App.js pra incluir essa partida na lista

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      'Partida agendada!',
      `${novaPartida.name} • ${novaPartida.date}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScreenHeader title="Agendar partida" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Categoria</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categories}
        >
          {CATEGORIES.map((item) => (
            <CategoryCard
              key={item.id}
              category={item}
              showDot
              selected={category === item.id}
              onPress={() => selecionarCategoria(item.id)}
            />
          ))}
        </ScrollView>

        {/* Servidor fixo */}
        <TouchableOpacity style={styles.server} activeOpacity={0.7}>
          <Image source={GAME_IMAGES[SELECTED_SERVER.gameKey]} style={styles.serverImage} resizeMode="cover" />
          <View style={styles.serverInfo}>
            <Text style={styles.serverName}>{SELECTED_SERVER.name}</Text>
            <Text style={styles.serverGame}>{SELECTED_SERVER.game}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.muted} />
        </TouchableOpacity>

        <View style={styles.dateRow}>
          <View>
            <Text style={styles.label}>Dia e mês</Text>
            <View style={styles.pair}>
              <SmallInput value={day} onChangeText={setDay} />
              <Text style={styles.separator}>/</Text>
              <SmallInput value={month} onChangeText={setMonth} />
            </View>
          </View>

          <View>
            <Text style={styles.label}>Horário</Text>
            <View style={styles.pair}>
              <SmallInput value={hour} onChangeText={setHour} />
              <Text style={styles.separator}>:</Text>
              <SmallInput value={minute} onChangeText={setMinute} />
            </View>
          </View>
        </View>

        <View style={styles.descriptionHeader}>
          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.hint}>Max {MAX_DESCRIPTION} caracteres</Text>
        </View>
        <TextInput
          style={styles.description}
          value={description}
          onChangeText={setDescription}
          multiline
          maxLength={MAX_DESCRIPTION}
          textAlignVertical="top"
          selectionColor={colors.primary}
        />

        <SafeAreaView edges={['bottom']}>
          <Button title="Agendar" handleFunction={agendar} style={styles.btn} />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 },
  label: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  hint: { color: colors.muted, fontSize: 12 },
  categoriesScroll: { marginHorizontal: -24, marginTop: 12 },
  categories: { paddingHorizontal: 24, gap: 8 },
  server: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    overflow: 'hidden',
    paddingRight: 16,
  },
  serverImage: { width: 68, height: 68, backgroundColor: colors.background },
  serverInfo: { flex: 1, marginLeft: 16, gap: 4 },
  serverName: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  serverGame: { color: colors.muted, fontSize: 14 },
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  pair: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  separator: { color: colors.muted, fontSize: 16 },
  smallInput: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    color: colors.text,
    fontSize: 18,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  description: {
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    color: colors.text,
    fontSize: 16,
    padding: 16,
  },
  btn: { marginTop: 32 },
});
