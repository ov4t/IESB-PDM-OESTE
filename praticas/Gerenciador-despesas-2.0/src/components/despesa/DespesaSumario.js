import React from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { cardShadow, getTheme } from '../../constants/theme';
import { formatCurrency } from '../../utils/format';

export default function DespesaSumario({ expenses, periodName }) {
  const theme = getTheme(useColorScheme());
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const label = expenses.length === 1 ? 'despesa' : 'despesas';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
        cardShadow,
      ]}
    >
      <View>
        <Text style={[styles.period, { color: theme.textSecondary }]}>{periodName}</Text>
        <Text style={[styles.count, { color: theme.text }]}>
          {expenses.length} {label}
        </Text>
      </View>
      <Text style={[styles.total, { color: theme.primary }]}>{formatCurrency(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginTop: 4,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  period: {
    fontSize: 13,
  },
  count: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
