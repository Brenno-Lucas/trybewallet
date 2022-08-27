import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    expenseAmount: 0,
  };

  render() {
    const { expenseAmount } = this.state;
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
          data-testid="total-field"
        >
          {`Despesa Total: ${expenseAmount}`}
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { email } = user;
  return {
    userEmail: email,
  };
};

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
