import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testes para página de Login', () => {
  it('testa os valores iniciais dos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });
  it('Testa se a página é redirecionada para Wallet após o login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(/email-input/i);
    const passwordInput = screen.getByTestId(/password-input/i);
    const emailTest = 'brenno@test.com';
    const passwordTest = 'abcdefg';
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    expect(emailInput).toHaveValue(emailTest);
    expect(passwordInput).toHaveValue(passwordTest);

    const submitBtn = screen.getByTestId(/submit-review-btn/i);

    userEvent.click(submitBtn);

    expect(history.location.pathname).toBe('/carteira');
  });
});
