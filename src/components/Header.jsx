import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from './WalletForm';

class Header extends Component {
  getCurrencieAsk = () => {
    const { userExpenses } = this.props;
    const currencySelected = userExpenses[userExpenses.length - 1].currency;
    const currenciesObj = userExpenses[userExpenses.length - 1].exchangeRates;
    const currencie = Object.values(currenciesObj)
      .filter((item) => item.code === currencySelected)[0].ask;
    return currencie;
  };

  saveTotalValueExpense = () => {
    const { userExpenses } = this.props;
    if (userExpenses.length === 0) {
      return 0;
    }
    const expenseValue = userExpenses[userExpenses.length - 1].value;
    const currencieAsk = this.getCurrencieAsk();
    const totalValue = (Number(expenseValue) * Number(currencieAsk)).toFixed(2);
    const value = document.getElementById('test').innerText;
    const prevValue = value.replace('Despesa Total: ', '');
    console.log(typeof totalValue);
    return (Number(totalValue) + Number(prevValue)).toFixed(2);
  };

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <div>Header</div>
        <p
          data-testid="email-field"
        >
          {`Email: ${userEmail}`}
        </p>
        <p
          id="test"
          data-testid="total-field"
        >
          {this.saveTotalValueExpense()}
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, wallet } = state;
  const { email } = user;
  const { expenses } = wallet;
  return {
    userEmail: email,
    userExpenses: expenses,
  };
};

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
