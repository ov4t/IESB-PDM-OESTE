import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Switch, Keyboard } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { APP_TITLE, INPUT_PLACEHOLDER, BUTTON_TEXT, LIST_TITLE } from './labels';

export default function App() {
  const [textoInput, setTextoInput] = useState('');
  const [soObrigatoria, setSoObrigatoria] = useState(false);

  const [disciplinas, setDisciplinas] = useState([
    { id: '1', nome: 'Programação para Dispositivos Móveis' },
    { id: '2', nome: 'Banco de Dados' },
  ]);

  function adicionarDisciplina() {
    if (textoInput.trim() === '') {
      return;
    }

    const nova = {
      id: Math.random().toString(), 
      nome: textoInput,
    };

    setDisciplinas([...disciplinas, nova]);
    setTextoInput('');
    Keyboard.dismiss(); 
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        
        <Text style={styles.header}>{APP_TITLE}</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
            value={textoInput}
            onChangeText={setTextoInput}
          />
          <Pressable
            onPress={adicionarDisciplina}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed
            ]}
          >
            <Text style={styles.buttonText}>{BUTTON_TEXT}</Text>
          </Pressable>
        </View>

        <View style={styles.switchRow}>
          { }
          <Text style={styles.switchText}>Mostrar apenas obrigatórias</Text>
          <Switch
            value={soObrigatoria}
            onValueChange={setSoObrigatoria}
          />
        </View>

        <Text style={styles.listTitle}>{LIST_TITLE}</Text>
        
        <View style={styles.listContainer}>
          {disciplinas.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text>{item.nome}</Text>
            </View>
          ))}
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#c5dff0' 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    marginTop: 10, 
    textAlign: 'center' 
  },
  inputRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  input: { 
    width: '70%', 
    borderWidth: 1, 
    borderColor: '#000000', 
    borderRadius: 8, 
    padding: 12, 
    backgroundColor: '#fff' 
  },
  button: { 
    width: '28%', 
    backgroundColor: '#007bff', 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  buttonPressed: { 
    backgroundColor: '#0056b3' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  switchRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 25 
  },
  switchText: { 
    fontSize: 14, 
    color: '#000000' 
  },
  listTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  listContainer: { 
    flex: 1 
  },
  listItem: { 
    backgroundColor: '#ffffff', 
    padding: 16, 
    marginBottom: 8, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#000000' 
  },
});