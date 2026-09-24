import { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import CategoryCard from '../components/CategoryCard';
import MatchItem from '../components/MatchItem';
import { colors } from '../constants/colors';
import { CATEGORIES, USER } from '../constants/mock';

/**
 * Tela Home. Além de "navigation" (que o React Navigation sempre entrega
 * de graça), esta tela recebe "matches" como prop extra — é o App.js que
 * decide passar essa prop
 *
 * Guardar a lista de partidas no App.js, e não aqui dentro da Home, se a lista vivesse só dentro da Home,
 * a tela de Agendar nunca teria como "avisar" a Home que uma partida nova
 * foi criada.
 *
 * @param {object} navigation - objeto do React Navigation
 * @param {object[]} matches - lista de partidas agendadas (vem do App.js)
 */
export default function Home({ navigation, matches }) {
  const [category, setCategory] = useState(null); // null = nenhuma categoria selecionada = mostra todas

  // Filtra a lista pela categoria selecionada. Como "matches" é uma
  // prop, sempre que o App.js adicionar uma
  // partida nova, essa prop muda, o React renderiza a Home, e este
  // filtro roda de novo automaticamente com a lista atualizada.
  const filteredMatches = category
    ? matches.filter((m) => m.category === category)
    : matches;

  function toggleCategory(id) {
    Haptics.selectionAsync();
    // Tocar de novo na MESMA categoria já selecionada desmarca ela
    // (volta a mostrar todas as partidas). É por isso que compara
    // "current === id" em vez de simplesmente fazer "setCategory(id)".
    setCategory((current) => (current === id ? null : id));
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        // O cabeçalho (avatar + saudação + categorias) não é um item da
        // lista — ele é fixo no topo. Por isso ele entra aqui, no
        // ListHeaderComponent, em vez de virar mais um item do "data".
        // A vantagem de ainda assim usar FlatList (e não um ScrollView
        // com tudo dentro) é que o FlatList só desenha na tela as
        // partidas que estão realmente visíveis — o que importa se essa
        // lista crescer bastante.
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Image source={USER.avatar} style={styles.avatar} />

              <View style={styles.greeting}>
                <Text style={styles.hello}>
                  Olá, <Text style={styles.name}>{USER.name}</Text>
                </Text>
                <Text style={styles.subtitle}>Hoje é dia de vitória</Text>
              </View>

              <TouchableOpacity
                style={styles.addBtn}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Schedule')}
              >
                <MaterialCommunityIcons name="plus" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

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
                  selected={category === item.id}
                  onPress={() => toggleCategory(item.id)}
                />
              ))}
            </ScrollView>

            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Partidas agendadas</Text>
              <Text style={styles.total}>Total {filteredMatches.length}</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <MatchItem
            match={item}
            // Repare que passamos só o "id" da partida pela rota, não o
            // objeto inteiro. A tela de Detalhes recebe esse id e busca o
            // objeto completo na lista de partidas (que ela também
            // recebe como prop, igual a Home) — assim, se a partida
            // mudasse enquanto o usuário navega, os Detalhes sempre
            // mostrariam a versão mais atual.
            onPress={() => navigation.navigate('ServerDetails', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma partida agendada nessa categoria.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  greeting: { flex: 1 },
  hello: { color: colors.text, fontSize: 20, marginLeft: 15 },
  name: { fontWeight: 'bold' },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 2, marginLeft: 15 },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesScroll: { marginHorizontal: -24, marginTop: 24 }, // rola de ponta a ponta da tela
  categories: { paddingHorizontal: 24, gap: 8 },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 8,
  },
  listTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  total: { color: colors.muted, fontSize: 14 },
  empty: { color: colors.muted, fontSize: 14, textAlign: 'center', marginTop: 32 },
});
