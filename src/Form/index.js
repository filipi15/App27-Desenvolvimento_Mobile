import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

export default function Form({ route }) {
  const [id, setId] = useState(route.params?.id)
  const [newTitle, setNewTitle] = useState(route.params?.title)
  const [newDescription, setNewDescription] = useState(route.params?.description)

  const navigation = useNavigation();

  const salvarTarefa = async () => {
    if (newTitle === undefined || newTitle.trim() === '') {
      alert('Digite o título da tarefa!')
      return;
    }

    const body = JSON.stringify({ title: newTitle, description: newDescription })

    if (id !== undefined) {
      // Alterar (PUT)
      await api.put(`/tasks/${id}`, body, { headers: { 'Content-Type': 'application/json' } });
    } else {
      // Incluir (POST)
      await api.post('/tasks', body, { headers: { 'Content-Type': 'application/json' } });
    }

    await route.params?.atualizarLista()
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cabecalho}>{id !== undefined ? 'Alterar tarefa' : 'Nova tarefa'}</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar React Native"
        defaultValue={route.params?.title}
        onChangeText={(text) => setNewTitle(text)}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Detalhes da tarefa"
        multiline={true}
        defaultValue={route.params?.description}
        onChangeText={(text) => setNewDescription(text)}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarTarefa}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
        <Text style={[styles.textoBotao, { color: '#5b3cc4' }]}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1effa',
  },
  cabecalho: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5b3cc4',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },
  botaoSalvar: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#5b3cc4',
    justifyContent: 'center',
    marginTop: 10,
  },
  botaoCancelar: {
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5b3cc4',
    justifyContent: 'center',
    marginTop: 10,
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FFF',
  },
});
