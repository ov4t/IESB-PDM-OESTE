import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

// Sempre retorna um novo array: nada de push, splice ou mutação direta.
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega os dados salvos ao iniciar.
  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            // O JSON guarda a data como texto; convertemos de volta para Date.
            dispatch({
              type: 'SET',
              payload: parsed.map((item) => ({ ...item, date: new Date(item.date) })),
            });
          }
        }
      } catch (error) {
        console.warn('Falha ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  // Salva a cada alteração, mas só depois do carregamento inicial
  // (evita sobrescrever os dados salvos com a lista vazia inicial).
  useEffect(() => {
    if (!isLoaded) return;
    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Falha ao salvar despesas:', error);
      }
    }
    saveExpenses();
  }, [expenses, isLoaded]);

  const addExpense = useCallback((data) => {
    dispatch({ type: 'ADD', payload: { id: generateId(), ...data } });
  }, []);

  const updateExpense = useCallback((id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const value = useMemo(
    () => ({ expenses, addExpense, updateExpense, deleteExpense }),
    [expenses, addExpense, updateExpense, deleteExpense]
  );

  // Evita piscar o estado vazio enquanto os dados salvos são lidos.
  if (!isLoaded) return null;

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}
