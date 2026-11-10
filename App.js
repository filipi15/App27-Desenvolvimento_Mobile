import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tarefas from './src/Tarefas/index';
import Form from './src/Form';
import Detalhes from './src/Detalhes';

const Stack = createStackNavigator();

const opcoesHeader = {
  headerStyle: {
    backgroundColor: '#5b3cc4'
  },
  headerTintColor: '#FFF',
}

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={opcoesHeader}>
        <Stack.Screen name="Tarefas" component={Tarefas} options={{ title: 'Minhas Tarefas' }} />
        <Stack.Screen name="Formulario" component={Form} options={{ title: 'Tarefa' }} />
        <Stack.Screen name="Detalhes" component={Detalhes} options={{ title: 'Detalhes da Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
