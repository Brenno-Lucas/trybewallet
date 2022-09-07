import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCurrencies, saveExpenses } from '../redux/actions';
import Table from './Table';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: {},
  };

  componentDidMount() {
    this.saveCurrencies();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.buttonEnabled();
    });
  };

  buttonEnabled = () => {

  };

  getCurrencies = async () => {
    const urlApi = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
  };

  putCurrenciesInArray = async () => {
    const currencies = await this.getCurrencies();
    delete currencies.USDT;
    return currencies;
  };

  saveCurrencies = async () => {
    const { dispatch } = this.props;
    const currenciesArray = Object.keys(await this.putCurrenciesInArray())
      .filter((item) => item);
    dispatch(saveCurrencies(currenciesArray));
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.state;
    this.setState({
      exchangeRates: await this.putCurrenciesInArray(),
    });
    dispatch(saveExpenses(this.state));
    this.setState({
      id: id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    });
  };

  render() {
    const { value,
      currency,
      method,
      tag,
      description } = this.state;
    const { pageCurrencies } = this.props;
    return (
      <div>
        <div>WalletForm</div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.onInputChange }
            >
              {pageCurrencies.map((currencyi) => (
                <option value={ currencyi } key={ currencyi }>{ currencyi }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.onInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.onInputChange }
            />
            <button
              type="submit"
              onClick={ this.onSubmit }
            >
              Adicionar despesa
            </button>
          </label>
        </form>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => {
  const { currencies, expenses } = wallet;
  return {
    pageCurrencies: currencies,
    pageExpenses: expenses,
  };
};

WalletForm.propTypes = {
  pageCurrencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
