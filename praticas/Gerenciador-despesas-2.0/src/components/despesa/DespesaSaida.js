import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { getTheme } from '../../constants/theme';
import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

// Layout comum das telas de listagem: conteúdo extra (ex.: busca) no topo,
// seguido da lista com o sumário (quantidade e total) no cabeçalho.
export default function DespesaSaida({
  expenses,
  periodName,
  emptyTitle,
  emptyHint,
  children,
}) {
  const theme = getTheme(useColorScheme());

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {children}
      <DespesaLista
        expenses={expenses}
        ListHeaderComponent={<DespesaSumario expenses={expenses} periodName={periodName} />}
        emptyTitle={emptyTitle}
        emptyHint={emptyHint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
