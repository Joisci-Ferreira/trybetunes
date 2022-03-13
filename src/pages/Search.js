import React from 'react';
// import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
// import SearchAlbum from '../componentes/SearchAlbum';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      // nameArtist: '',
      loading: false,
      // albums: [],

    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    // this.searchForm = this.searchForm.bind(this);
    // this.discAlbums = this.discAlbums.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      artist: value,
    });
  }

  buttonClick(event) {
    const { artist } = this.state;
    event.preventDefault();
    this.setState({
      artist,
      loading: true,
    });
    /* searchAlbumsAPIs(artist).then((artistAlbum) => {
      this.setState({
        loading: false,
        albums: artistAlbum,
        artist: '',
      });
    }); */
  }

  /* discAlbums() {
    const { albums, nameArtist } = this.state;
    return (
      albums.length === 0 ? <p>Nenhum álbum foi encontrado</p>
        : (
          <>
            <p>
              Resultado de álbuns de:
              {' '}
              {`${nameArtist}`}
            </p>

            { albums.map((album) => (
              <SearchAlbum
                key={ album.collectionId }
                album={ album }
              />
            )) }
          </>
        )
    );
  } */

  searchForm() {
    const { artist } = this.state;
    const minLatter = 2;
    return (
      <form>
        <label htmlFor="artista">
          <input
            type="text"
            data-testid="search-artist-input"
            value={ artist }
            id="artista"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ artist.length < minLatter }
          onClick={ this.buttonClick }
        >
          Pesquisar

        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <h2>{ loading ? <Loading /> : this.searchForm() }</h2>
        </div>
      </div>
    );
  }
}

export default Search;
