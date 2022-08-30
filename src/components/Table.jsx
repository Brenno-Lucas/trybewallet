import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  getCurrencieAsk = (expense) => {
    const currencySelected = expense.currency;
    const currenciesObj = expense.exchangeRates;
    const currencieAsk = Object.values(currenciesObj)
      .filter((item) => item.code === currencySelected)[0].ask;
    return currencieAsk;
  };

  getCurrencieName = (expense) => {
    const currencySelected = expense.currency;
    const currenciesObj = expense.exchangeRates;
    const currencieName = Object.values(currenciesObj)
      .filter((item) => item.code === currencySelected)[0].name;
    return currencieName;
  };

  getValue = (expense, expenseAsk) => {
    const ask = expenseAsk;
    const expenseValue = expense.value;
    return (Number(ask) * Number(expenseValue)).toFixed(2);
  };

  render() {
    const { pageExpenses } = this.props;
    return (
      <div>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            { pageExpenses.map((item) => (
              <tr key={ item.id } id={ item.id }>
                <td>{ item.description }</td>
                <td>{ item.tag }</td>
                <td>{ item.method }</td>
                <td>{ Number(item.value).toFixed(2) }</td>
                <td>{this.getCurrencieName(item)}</td>
                <td>{Number(this.getCurrencieAsk(item)).toFixed(2)}</td>
                <td>{this.getValue(item, this.getCurrencieAsk(item))}</td>
                <td>Real Brasileiro</td>
                <td>Edit/Remove</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => {
  const { expenses } = wallet;
  return {
    pageExpenses: expenses,
  };
};

Table.propTypes = {
  pageExpenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Table);
