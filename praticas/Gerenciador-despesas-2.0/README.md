# Gerenciador de Despesas 2.0

Atividade Prática da Aula 09 · PDM — Estado Global, Formulários e UX.

## Como rodar

Dentro da pasta do projeto (`Gerenciador-despesas-2.0`):

```bash
npm install
npx expo install @react-native-async-storage/async-storage @react-native-community/datetimepicker
npx expo start
```

O segundo comando instala as duas dependências com a versão compatível com o SDK do Expo.
O `app.json` já usa `"userInterfaceStyle": "automatic"`, necessário para o tema escuro.

## Estrutura

```
App.js
index.js
src/
├── components/despesa/   DespesaItem, DespesaLista, DespesaSaida, DespesaSumario
├── constants/            theme.js, categories.js
├── hooks/                useDebounce.js
├── store/                expenses-context.js
├── screens/              TodasDespesas, DespesasRecentes, GerenciarDespesa
└── utils/                format.js
```

## Decisões

- **Estado:** `Context API` + `useReducer` (ADD, UPDATE, DELETE, SET), sem bibliotecas externas.
- **Persistência:** `AsyncStorage` na chave `@expenses`; o estado `isLoaded` impede que a
  lista vazia inicial sobrescreva os dados salvos.
- **Datas:** guardadas como `Date` em memória e convertidas de/para texto ao ler/gravar.
- **Recentes:** despesas com data a partir de 7 dias atrás (00:00).
- **DespesaSaida:** layout reutilizado pelas duas abas (sumário no cabeçalho da lista).
