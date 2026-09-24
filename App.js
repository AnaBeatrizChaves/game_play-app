import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import ServerDetails from './src/screens/ServerDetails';
import Schedule from './src/screens/Schedule';
import { MATCHES } from './src/constants/mock';
import { colors } from './src/constants/colors';

// createNativeStackNavigator devolve um par de componentes (Navigator e
// Screen) já ligados um ao outro. É basicamente a "planta" da navegação:
// dizemos quais telas existem e em que ordem elas empilham.
const Stack = createNativeStackNavigator();

export default function App() {
  // A lista de partidas mora AQUI, no componente mais "alto" da árvore —
  // não dentro da Home, nem dentro do Agendar. Por quê? Porque tanto a
  // Home (que exibe a lista) quanto o Agendar (que cria uma partida nova)
  // precisam enxergar a MESMA lista. Se cada tela guardasse sua própria
  // cópia com useState, agendar uma partida no Agendar jamais apareceria
  // na Home
  //
  // Isso é um padrão comum em React chamado "lifting state up" (subir o
  // estado): quando duas telas/componentes precisam compartilhar uma
  // informação, ela sobe para o ancestral comum dos dois.
  const [matches, setMatches] = useState(MATCHES);

  // Função que adiciona uma partida no início da lista. Ela mora aqui
  // (perto do estado que ela mexe) e é repassada como prop (propriedade) para a tela de
  // Agendar, que é quem realmente chama essa função quando o usuário
  // confirma o agendamento.
  function addMatch(match) {
    setMatches((current) => [match, ...current]);
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // cada tela desenha o próprio cabeçalho (ver ScreenHeader)
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Login" component={Login} />

        {/* Home, ServerDetails e Schedule precisam receber "matches"
            (e/ou "addMatch") além do "navigation" e "route" que o React
            Navigation já entrega de graça pra qualquer tela. A forma mais
            simples de fazer isso, sem precisar de Context nem de nenhuma
            biblioteca de estado global, é usar a tela como "função filha"
            do Stack.Screen (em vez do atalho "component={...}"): assim
            controlamos exatamente quais props cada tela recebe.
            "gestureEnabled: false" na Home impede o gesto de "arrastar
            para voltar" do iOS, porque não faz sentido voltar da Home
            para o Login. */}
        <Stack.Screen name="Home" options={{ gestureEnabled: false }}>
          {(props) => <Home {...props} matches={matches} />}
        </Stack.Screen>

        <Stack.Screen name="ServerDetails">
          {(props) => <ServerDetails {...props} matches={matches} />}
        </Stack.Screen>

        <Stack.Screen name="Schedule">
          {(props) => <Schedule {...props} addMatch={addMatch} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
