import React, { useState, useEffect } from 'react';
import {View,Text,Image,StyleSheet,Alert,} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import * as labels from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (erro) {
        Alert.alert(labels.erroCarregarTitulo, labels.erroCarregarMensagem);
      } finally {
        setCarregado(true);
      }
    }
    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (!carregado) return;
    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert(labels.erroSalvarTitulo, labels.erroSalvarMensagem);
      }
    }
    salvarCompromissos();
  }, [compromissos, carregado]);

  function handleAdd() {
    if (texto.trim().length === 0) {
      Alert.alert(labels.alertaVazioTitulo, labels.alertaVazioMensagem);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toLocaleString('pt-BR'),
      concluido: false,
    };

    setCompromissos((listaAtual) => [novoCompromisso, ...listaAtual]);
    setTexto('');
  }

  function handleDelete(id) {
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  function handleToggleConcluido(id) {
    setCompromissos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  const pendentes = compromissos.filter((item) => !item.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <View style={styles.contador}>
            <Text style={styles.contadorNumero}>{pendentes}</Text>
            <Text style={styles.contadorLabel}>{labels.pendentesLabel}</Text>
          </View>

          <Image source={require('./assets/iesb-logo.png')} style={styles.logo} />
          <Text style={styles.titulo}>{labels.tituloApp}</Text>
          <Text style={styles.subtitulo}>{labels.subtituloApp}</Text>
        </View>

        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdd}
          labels={labels}
        />

        <CompromissoList
          itens={compromissos}
          onDelete={handleDelete}
          onToggleConcluido={handleToggleConcluido}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2f64',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2f64',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 2,
    textAlign: 'center',
  },
  contador: {
    position: 'absolute',
    top: 12,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2f64',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  contadorNumero: {
    fontSize: 16,
    fontWeight: '700',
    color: '#af1e1e',
  },
  contadorLabel: {
    fontSize: 10,
    color: '#af1e1e',
  },
});