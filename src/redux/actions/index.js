// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';

export const selectEmail = (email) => ({
  type: USER_EMAIL,
  payload: {
    email,
  },
});

export const USER_WALLET = 'USER_WALLET';

export const selectWallet = (currencies, expenses, editor, idToEdit) => ({
  type: USER_WALLET,
  payload: {
    currencies,
    expenses,
    editor,
    idToEdit,
  },
});
