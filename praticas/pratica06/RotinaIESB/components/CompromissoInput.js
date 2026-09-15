import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, Platform } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="done"
        onSubmitEditing={onAdd}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        onPress={onAdd}
        android_ripple={Platform.OS === 'android' ? { color: '#1e3a8a' } : undefined}
      >
        <Text style={styles.botaoTexto}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    width: '68%',
    height: 46,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },
  botao: {
    width: '28%',
    height: 46,
    marginLeft: '4%',
    backgroundColor: '#1E40AF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});