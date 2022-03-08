import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.headerNameChange();
  }

  async headerNameChange() {
    this.setState({
      loading: true,
    });
    const { name } = await getUser();
    this.setState({
      loading: false,
      name,
    });
  }

  render() {
    const { loading, name } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{name}</p>
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>

        </nav>
      </header>
    );
  }
}

export default Header;
