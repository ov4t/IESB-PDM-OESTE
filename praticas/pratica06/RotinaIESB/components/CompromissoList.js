import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, Platform } from 'react-native';
import { botaoRemoverAcessibilidade, botaoConcluirAcessibilidade } from '../labels';

function Item({ item, onDelete, onToggleConcluido }) {
  return (
    <Pressable
      onPress={() => onToggleConcluido(item.id)}
      android_ripple={Platform.OS === 'android' ? { color: '#E5E7EB' } : undefined}
      accessibilityLabel={botaoConcluirAcessibilidade}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressionado]}
    >
      <View style={styles.itemTexto}>
        <Text
          style={[
            styles.itemLabel,
            item.concluido && styles.itemLabelConcluido,
          ]}
        >
          {item.texto}
        </Text>
        <Text style={styles.itemData}>{item.criadoEm}</Text>
      </View>

      <Pressable
        onPress={() => onDelete(item.id)}
        android_ripple={Platform.OS === 'android' ? { color: '#FECACA' } : undefined}
        accessibilityLabel={botaoRemoverAcessibilidade}
        style={({ pressed }) => [
          styles.botaoRemover,
          pressed && styles.botaoRemoverPressionado,
        ]}
      >
        <Text style={styles.botaoRemoverTexto}>X</Text>
      </Pressable>
    </Pressable>
  );
}

export default function CompromissoList({ itens, onDelete, onToggleConcluido, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item item={item} onDelete={onDelete} onToggleConcluido={onToggleConcluido} />
        )}
        contentContainerStyle={itens.length === 0 && styles.listaVaziaContainer}
        ListEmptyComponent={<Text style={styles.listaVaziaTexto}>{listaVazia}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  listaVaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listaVaziaTexto: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  itemPressionado: {
    opacity: 0.7,
  },
  itemTexto: {
    flex: 1,
    marginRight: 10,
  },
  itemLabel: {
    fontSize: 15,
    color: '#111827',
  },
  itemLabelConcluido: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  itemData: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  botaoRemover: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoRemoverPressionado: {
    opacity: 0.8,
  },
  botaoRemoverTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});