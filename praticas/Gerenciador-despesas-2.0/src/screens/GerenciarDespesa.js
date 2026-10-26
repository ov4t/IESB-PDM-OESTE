import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/categories';
import { getTheme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { formatDate } from '../utils/format';

const AMOUNT_MASK = /^\d*\.?\d{0,2}$/;

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (Number.isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const theme = getTheme(useColorScheme());

  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const editedExpense = expenses.find((expense) => expense.id === expenseId);

  const [form, setForm] = useState({
    description: editedExpense?.description ?? '',
    amount: editedExpense ? String(editedExpense.amount) : '',
    date: editedExpense?.date ?? new Date(),
    category: editedExpense?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));

    // Se o campo estava com erro, revalida e remove a mensagem quando corrigido.
    if (errors[field]) {
      const fieldError = validate({ ...form, [field]: value })[field];
      setErrors((current) => {
        const next = { ...current };
        if (fieldError) {
          next[field] = fieldError;
        } else {
          delete next[field];
        }
        return next;
      });
    }
  }

  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (AMOUNT_MASK.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function handleSelectCategory(category) {
    handleChange('category', category);
    setShowCategoryModal(false);
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza de que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  function inputStyle(field) {
    return [
      styles.input,
      {
        backgroundColor: theme.inputBackground,
        borderColor: errors[field] ? theme.danger : theme.border,
        color: theme.text,
      },
    ];
  }

  function renderError(field) {
    return errors[field] ? (
      <Text style={[styles.error, { color: theme.danger }]}>{errors[field]}</Text>
    ) : null;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          placeholder="Ex.: Almoço"
          placeholderTextColor={theme.textSecondary}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
        />
        {renderError('description')}

        <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
        <TextInput
          style={inputStyle('amount')}
          placeholder="0.00"
          placeholderTextColor={theme.textSecondary}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={handleAmountChange}
        />
        {renderError('amount')}

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <Pressable style={inputStyle('date')} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: theme.text, fontSize: 16 }}>{formatDate(form.date)}</Text>
        </Pressable>
        {renderError('date')}
        {showDatePicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleDateChange}
          />
        )}

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <Pressable
          style={[inputStyle('category'), styles.selector]}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text
            style={{
              color: form.category ? theme.text : theme.textSecondary,
              fontSize: 16,
            }}
          >
            {form.category || 'Selecione uma categoria'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={theme.textSecondary} />
        </Pressable>
        {renderError('category')}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.primary },
            pressed && styles.pressed,
          ]}
          onPress={handleSave}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.deleteButton,
              { borderColor: theme.danger },
              pressed && styles.pressed,
            ]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={20} color={theme.danger} />
            <Text style={[styles.buttonText, { color: theme.danger }]}>Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: theme.overlay }]}
          onPress={() => setShowCategoryModal(false)}
        >
          <Pressable style={[styles.sheet, { backgroundColor: theme.card }]} onPress={() => {}}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Categoria</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[styles.option, { borderBottomColor: theme.border }]}
                onPress={() => handleSelectCategory(category)}
              >
                <Text style={{ color: theme.text, fontSize: 16 }}>{category}</Text>
                {form.category === category && (
                  <Ionicons name="checkmark" size={20} color={theme.primary} />
                )}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 48,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  error: {
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 28,
    paddingVertical: 14,
    borderRadius: 8,
  },
  deleteButton: {
    marginTop: 12,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
