import React, { useMemo } from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();

  const recentExpenses = useMemo(() => {
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - 7);
    return expenses.filter((expense) => expense.date >= cutoff).sort((a, b) => b.date - a.date);
  }, [expenses]);

  return (
    <DespesaSaida
      expenses={recentExpenses}
      periodName="Últimos 7 dias"
      emptyTitle="Nenhuma despesa recente."
      emptyHint="Toque em + para adicionar."
    />
  );
}
