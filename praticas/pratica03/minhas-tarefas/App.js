import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './.claude/util';
import titulo_padrao from './.claude/util'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{titulo}</Text>
      <Text>{titulo_padrao}</Text>
      <Text style={{margin: 20}}>{titulo}</Text>
      <Button title='Clique aqui...'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
