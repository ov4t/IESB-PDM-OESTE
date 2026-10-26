import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getTheme } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const theme = getTheme(useColorScheme());
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filteredExpenses = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    const list = term
      ? expenses.filter((expense) => expense.description.toLowerCase().includes(term))
      : expenses;
    return [...list].sort((a, b) => b.date - a.date);
  }, [expenses, debouncedSearch]);

  const searchTerm = debouncedSearch.trim();

  return (
    <DespesaSaida
      expenses={filteredExpenses}
      periodName={searchTerm ? `Busca: "${searchTerm}"` : 'Todas as despesas'}
      emptyTitle={searchTerm ? 'Nenhum resultado.' : 'Nenhuma despesa.'}
      emptyHint={
        searchTerm ? 'Tente buscar por outro termo.' : 'Toque em + para adicionar.'
      }
    >
      <View
        style={[
          styles.searchBox,
          { backgroundColor: theme.inputBackground, borderColor: theme.border },
        ]}
      >
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Buscar por descrição"
          placeholderTextColor={theme.textSecondary}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>
    </DespesaSaida>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
