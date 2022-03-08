import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../componentes/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async buttonClick() {
    const { name } = this.state;
    const user = {
      name,
    };
    this.setState({
      loading: true,
    });
    await createUser(user);
    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { name, loading, redirect } = this.state;
    const minLatter = 3;
    if (loading) {
      return <Loading />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="nome">
            <input
              type="text"
              data-testid="login-name-input"
              name="name"
              value={ name }
              id="nome"
              placeholder="Nome"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ name.length < minLatter }
            id="entrar"
            onClick={ this.buttonClick }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

export default Login;
