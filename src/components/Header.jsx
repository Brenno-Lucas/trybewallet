import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from './WalletForm';

class Header extends Component {
  saveTotalValueExpense = () => {
    const { userExpenses } = this.props;
    if (userExpenses.length === 0) {
      return '0.00';
    }
    const initialValue = 0;
    const expenseValue = userExpenses
      .reduce((acc, { value, currency, exchangeRates }) => acc
      + Number(value) * exchangeRates[currency].ask, initialValue).toFixed(2);
    return expenseValue;
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
