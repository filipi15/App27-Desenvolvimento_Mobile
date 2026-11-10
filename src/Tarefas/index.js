import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import api from '../services/api';
import Card from '../components/Card';
import { useNavigation } from '@react-navigation/native';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([])
  const [loading, setLoading] = useState(true)

  // Quando o componente é montado em tela (quando abrimos o App)
  useEffect(() => {
    const iniciar = async () => {
      await carregarTarefas()
      setLoading(false)
    };

    iniciar();
  }, [])

  const carregarTarefas = async () => {
    const response = await api.get('/tasks')
    setTarefas(response.data)
  }

  const navigation = useNavigation();

  function irFormulario(){
    navigation.navigate('Formulario', { atualizarLista: carregarTarefas });
  }

  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color="#5b3cc4" size={40} />
        <Text style={styles.carregando}>Carregando tarefas...</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.contador}>{tarefas.length} tarefa(s) cadastrada(s)</Text>

        <FlatList
          data={tarefas}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Card data={item} funcCarregarTarefas={carregarTarefas} />}
        />

        <TouchableOpacity style={styles.botaoIncluir} onPress={irFormulario}>
          <Feather name='plus' size={30} color='#FFF' />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1effa',
  },
  carregando: {
    marginTop: 10,
    color: '#5b3cc4',
  },
  contador: {
    fontSize: 14,
    color: '#555',
    marginTop: 15,
    marginLeft: 15,
  },
  botaoIncluir: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5b3cc4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
