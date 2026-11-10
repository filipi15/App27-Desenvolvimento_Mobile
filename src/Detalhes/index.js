import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api';

// Tela que consulta UMA tarefa pelo id (GET /tasks/{id})
export default function Detalhes({ route }) {
  const [tarefa, setTarefa] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const consultarTarefa = async () => {
      const response = await api.get(`/tasks/${route.params?.id}`)
      setTarefa(response.data)
      setLoading(false)
    };

    consultarTarefa();
  }, [])

  // Converte a data "2026-05-30T02:37:15.418Z" para "30/05/2026"
  function formatarData(data) {
    if (data === undefined) {
      return '';
    }
    let partes = data.substring(0, 10).split('-')
    return partes[2] + '/' + partes[1] + '/' + partes[0]
  }

  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color="#5b3cc4" size={40} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{tarefa.title}</Text>
        <Text style={styles.descricao}>{tarefa.description}</Text>

        <Text style={styles.label}>Código:</Text>
        <Text style={styles.valor}>{tarefa.id}</Text>

        <Text style={styles.label}>Situação:</Text>
        <Text style={[styles.valor, { color: tarefa.finished ? 'green' : 'orange' }]}>
          {tarefa.finished ? 'Finalizada' : 'Pendente'}
        </Text>

        <Text style={styles.label}>Criada em:</Text>
        <Text style={styles.valor}>{formatarData(tarefa.create_at)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f1effa',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5b3cc4',
  },
  descricao: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
  valor: {
    fontSize: 18,
    color: '#222',
  },
});
