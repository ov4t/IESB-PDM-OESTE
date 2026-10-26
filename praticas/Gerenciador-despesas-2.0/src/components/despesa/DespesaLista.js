import React from 'react';
import { FlatList, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../../constants/theme';
import DespesaItem from './DespesaItem';

export default function DespesaLista({
  expenses,
  ListHeaderComponent,
  emptyTitle = 'Nenhuma despesa.',
  emptyHint = 'Toque em + para adicionar.',
}) {
  const theme = getTheme(useColorScheme());

  const empty = (
    <View style={styles.empty}>
      <Ionicons name="wallet-outline" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyTitle, { color: theme.text }]}>{emptyTitle}</Text>
      <Text style={[styles.emptyHint, { color: theme.textSecondary }]}>{emptyHint}</Text>
    </View>
  );

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem expense={item} />}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={empty}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
  emptyHint: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
