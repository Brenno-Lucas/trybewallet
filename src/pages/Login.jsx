import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailInput: '',
    password: '',
    submitDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.buttonEnabled();
    });
  };

  validateInputs = (param1, param2) => {
    const passwordMinLength = 6;
    const regex = /\S+@\S+\.\S+/;
    const emailTest = regex.test(param1)
    && param2.length >= passwordMinLength;
    return emailTest;
  };

  buttonEnabled = () => {
    const { emailInput, password } = this.state;
    const enableButton = this.validateInputs(emailInput, password);
    this.setState({ submitDisabled: !enableButton });
  };

  render() {
    const { emailInput, password, submitDisabled } = this.state;
    const { dispatch, history } = this.props;
    return (
      <div>
        <div>Login</div>
        <form>
          <input
            type="email"
            name="emailInput"
            data-testid="email-input"
            value={ emailInput }
            onChange={ this.onInputChange }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ (event) => {
              event.preventDefault();
              dispatch(selectEmail(emailInput));
              history.push('/carteira');
            } }
            disabled={ submitDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { email } = user;
  return {
    Useremail: email,
  };
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
