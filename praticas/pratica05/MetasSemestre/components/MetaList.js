import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhuma meta cadastrada ainda.{'\n'}Adicione a primeira acima! 🎯
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            style={styles.textArea}
            onPress={() => onToggle && onToggle(item.id)}
            android_ripple={{ color: '#e5e7eb' }}
          >
            <Text
              style={[
                styles.itemText,
                item.concluida && styles.itemTextDone,
              ]}
            >
              {item.texto}
            </Text>
            <Text style={styles.itemDate}>
              Criada em {new Date(item.criadaEm).toLocaleDateString('pt-BR')}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onDelete(item.id)}
            android_ripple={{ color: '#fecaca', borderless: true }}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
            ]}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eceff1',
  },
  textArea: {
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    color: '#1f2933',
    fontWeight: '500',
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#9aa0a6',
  },
  itemDate: {
    fontSize: 11,
    color: '#9aa0a6',
    marginTop: 4,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    backgroundColor: '#fef2f2',
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteButtonText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9aa0a6',
    fontSize: 15,
    lineHeight: 22,
  },
});