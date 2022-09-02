// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SAVE_CURRENCIES, SAVE_EXPENSES, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCIES: {
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  }
  case SAVE_EXPENSES: {
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload.expenses },
      ],
    };
  }
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload.id),
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
