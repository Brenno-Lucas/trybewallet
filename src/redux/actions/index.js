// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';

export const selectEmail = (email) => ({
  type: USER_EMAIL,
  payload: {
    email,
  },
});

export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: {
    currencies,
  },
});

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: {
    expenses,
  },
});

/*
export const saveExpense = (currencies, expenses, editor, idToEdit) => ({
  type: SAVE_CURRENCIES,
  payload: {
    currencies,
    expenses,
    editor,
    idToEdit,
  },
});
*/
