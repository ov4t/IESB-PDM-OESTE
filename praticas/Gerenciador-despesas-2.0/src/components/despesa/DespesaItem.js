import React from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cardShadow, getTheme } from '../../constants/theme';
import { formatCurrency, formatDate } from '../../utils/format';

export default function DespesaItem({ expense }) {
  const navigation = useNavigation();
  const theme = getTheme(useColorScheme());

  function handlePress() {
    navigation.navigate('GerenciarDespesa', { expenseId: expense.id });
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        cardShadow,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: theme.text }]} numberOfLines={1}>
          {expense.description}
        </Text>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {expense.category} · {formatDate(expense.date)}
        </Text>
      </View>
      <View style={[styles.amountBox, { backgroundColor: theme.primary }]}>
        <Text style={[styles.amount, { color: theme.onPrimary }]}>
          {formatCurrency(expense.amount)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  pressed: {
    opacity: 0.75,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
    marginTop: 4,
  },
  amountBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  amount: {
    fontWeight: 'bold',
  },
});
