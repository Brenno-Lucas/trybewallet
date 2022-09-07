import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testes para página referente à Carteira', () => {
  const email = 'brenno@test.com';
  const initialState = {
    user: {
      email,
    },
    wallet: {
      currencies: Object.values(mockData).map(({ code }) => code),
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };
  it('testa os valores iniciais dos inputs', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const emailTest = screen.getByTestId(/email-field/i);
    expect(emailTest).toBeInTheDocument();

    const expenseInput = screen.getByTestId(/value-input/i);
    const currencyInput = screen.getByTestId(/currency-input/i);
    const methodInput = screen.getByTestId(/method-input/i);
    const tagInput = screen.getByTestId(/tag-input/i);
    const descriptionInput = screen.getByTestId(/description-input/i);
    const submitButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(expenseInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(expenseInput).toHaveValue('');
    expect(currencyInput).toHaveValue('USD');
    expect(methodInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Alimentação');
    expect(descriptionInput).toHaveValue('');
  });
  it('testa o preenchimento dos campos inputs', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const expenseInput = screen.getByTestId(/value-input/i);
    const currencyInput = screen.getByTestId(/currency-input/i);
    const methodInput = screen.getByTestId(/method-input/i);
    const tagInput = screen.getByTestId(/tag-input/i);
    const descriptionInput = screen.getByTestId(/description-input/i);
    const submitButton = screen.getByRole('button', { name: /Adicionar despesa/i });

    userEvent.type(expenseInput, '5');
    userEvent.selectOptions(currencyInput, 'AUD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Transporte');
    userEvent.type(descriptionInput, 'test');

    expect(expenseInput).toHaveValue('5');
    expect(currencyInput).toHaveValue('AUD');
    expect(methodInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Transporte');
    expect(descriptionInput).toHaveValue('test');

    userEvent.click(submitButton);
  });
});
