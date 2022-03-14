import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../componentes/Loading';
import MusicCard from '../componentes/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      favorites: [],
      loading: true,
    };
    this.musicsList = this.musicsList.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.favoriteList = this.favoriteList.bind(this);
    this.recoverFavorite = this.recoverFavorite.bind(this);
  }

  componentDidMount() {
    this.musicsList();
    this.favoriteList();
  }

  async handleCheck(trackId) {
    const { musics, favorites } = this.state;
    const favoriteSong = favorites.find((album) => album.trackId === trackId);

    if (favoriteSong) {
      this.setState({
        loading: true,
      });
      await removeSong(favoriteSong);
      this.setState((prevState) => ({
        favorites: prevState.favorites.filter((album) => album.trackId !== trackId),
        loading: false,
      }));
    } else {
      const songAtual = musics.find((album) => album.trackId === trackId);
      this.setState({
        loading: true,
      });
      await addSong(songAtual);
      this.setState((prevState) => ({
        favorites: [...prevState.favorites, songAtual],
        loading: false,
      }));
    }
  }

  async favoriteList() {
    this.setState(() => ({
      loading: true,
    }));
    await getFavoriteSongs().then((list) => {
      this.setState(() => ({
        favorites: list,
        loading: false,
      }));
    });
  }

  async musicsList() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const musicAlbum = await getMusics(id);
    const result = [...musicAlbum];
    const musics = result;

    this.setState({
      musics,
      loading: false,
    });
    this.favoriteList();
  }

  recoverFavorite(checked) {
    this.setState({ loading: checked });
  }

  render() {
    const { musics, loading, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <div>
              <h3 data-testid="artist-name">{ musics[0].artistName }</h3>
              <h4 data-testid="album-name">{ musics[0].collectionName }</h4>
            </div>
            <div>
              {musics.map((album, music) => {
                if (music > 0) {
                  return (<MusicCard
                    key={ music }
                    trackName={ album.trackName }
                    previewUrl={ album.previewUrl }
                    data-testid={ album.trackId }
                    trackId={ album.trackId }
                    onClick={ this.handleCheck }
                    onChecked={ favorites
                      .some((favorite) => favorite.trackId === album.trackId) }
                  />);
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
