// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { USER_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_WALLET: {
    return {
      ...state,
      currencies: action.payload.currencies,
      expenses: action.payload.expenses,
      editor: action.payload.editor,
      idToEdit: action.payload.idToEdit,
    };
  }
  default:
    return state;
  }
}

export default walletReducer;
