import { StyleSheet, View, TextInput,Button } from 'react-native';
import { rotulo_btn_cadastro_meta,rotulo_input_meta } from './mensagens';
import { useState } from 'react';
import MetaList from './components/MetaList';
import MetaInput from './components/MetaInput';

export default function App() {

  const [metas,setMetas] = useState([]);

  function adicionarMetaHandler(){
    setMetas([...metas,inputMetaText]);
  }


  return (
    <View style={styles.mainContainer}>
      

      <View style={styles.metaContainer}>
        <MetaList array={metas}  />
      </View>
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
  mainContainer:{
    padding: 30,
    flex: 1,
    flexDirection: 'column'
  },
 
  metaContainer: {
    flex: 1,
  },
  
});