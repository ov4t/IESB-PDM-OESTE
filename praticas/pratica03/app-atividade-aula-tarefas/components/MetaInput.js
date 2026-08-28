import { Button, TextInput, StyleSheet, View} from "react-native";

function MetaInput(props){
    const [inputMetaText,setInputMetaText] = useState('');
    function adicionarMetaHandler(){
    setMetas([...metas,inputMetaText]);
  }
  function addMetaHandler(){
    props.onAddMeta(inputMetaText);
    setInputMetaText('');
  }

    return(
        <View style={{flexDirection: 'row', justifyContent:'space-between', flex:1}}>

        <View style={{width:'65%'}}>
        <TextInput onChangeText={metaInputHandler} style={styles.inputText} placeholder={rotulo_input_meta}/>
        </View>

      <View style={{width:'30%'}}>
      <Button onPress={addMetaHandler} title={rotulo_btn_cadastro_meta}/>
      </View>
    </View>
    )
}
export default MetaInput

const styles = StyleSheet.create({
    inputText:{
    borderColor: "#cccccc",
    borderWidth: 1
  },
})