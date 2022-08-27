import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectWallet } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.putCurrenciesInArray();
  }

  getCurrencies = async () => {
    const urlApi = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
  };

  putCurrenciesInArray = async () => {
    const { dispatch } = this.props;
    const currencies = await this.getCurrencies();
    const currenciesArray = Object.keys(currencies).filter((item) => item !== 'USDT');
    dispatch(selectWallet(currenciesArray));
  };

  render() {
    const { pageCurrencies } = this.props;
    return (
      <div>
        <div>WalletForm</div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input type="text" name="value-input" data-testid="value-input" />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select name="currency-input" data-testid="currency-input">
              {pageCurrencies.map((currency) => (
                <option value={ currency } key={ currency }>{ currency }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select name="method-input" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select name="tag-input" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input type="text" name="description-input" data-testid="description-input" />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => {
  const { currencies } = wallet;
  return {
    pageCurrencies: currencies,
  };
};

WalletForm.propTypes = {
  pageCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
