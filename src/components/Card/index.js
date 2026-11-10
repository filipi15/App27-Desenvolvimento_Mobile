import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

// Os dados são lidos direto de "data" (e não copiados para useState),
// assim o card mostra o valor atualizado depois de editar ou finalizar a tarefa
function Card({ data, funcCarregarTarefas }) {
  const navigation = useNavigation();

  const excluirTarefa = async () => {
    await api.delete(`/tasks/${data.id}`);
    await funcCarregarTarefas();
  }

  const finalizarTarefa = async () => {
    await api.patch(`/tasks/${data.id}`);
    await funcCarregarTarefas();
  }

  function irFormulario(){
    navigation.navigate('Formulario', { id: data.id, title: data.title, description: data.description, atualizarLista: funcCarregarTarefas });
  }

  function irDetalhes(){
    navigation.navigate('Detalhes', { id: data.id });
  }

  return (
    <View style={[styles.card, { borderLeftColor: data.finished ? 'green' : '#5b3cc4' }]}>
      <TouchableOpacity onPress={irDetalhes}>
        <Text style={[styles.titulo, data.finished ? styles.finalizada : null]}>{data.title}</Text>
        <Text style={styles.descricao}>{data.description}</Text>
        <Text style={[styles.status, { color: data.finished ? 'green' : 'orange' }]}>
          {data.finished ? 'Finalizada' : 'Pendente'}
        </Text>
      </TouchableOpacity>

      <View style={styles.botoes}>
        {data.finished ? null : (
          <TouchableOpacity style={[styles.botao, { backgroundColor: 'green' }]} onPress={finalizarTarefa}>
            <Feather name='check' size={16} color='#FFF' />
            <Text style={styles.textoBotao}>Finalizar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#f0a500' }]} onPress={irFormulario}>
          <Feather name='edit-2' size={16} color='#FFF' />
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: 'tomato' }]} onPress={excluirTarefa}>
          <Feather name='trash-2' size={16} color='#FFF' />
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 12,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  finalizada: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  descricao: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
  },
  status: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  textoBotao: {
    color: '#FFF',
    marginLeft: 5,
  },
});

export default Card;
