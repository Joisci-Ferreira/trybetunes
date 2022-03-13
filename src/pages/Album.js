import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../componentes/Loading';
import MusicCard from '../componentes/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
    };
    this.musicsList = this.musicsList.bind(this);
  }

  componentDidMount() {
    this.musicsList();
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
  }

  render() {
    const { musics, loading } = this.state;
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
              {musics.map(({ trackName, previewUrl }, music) => {
                if (music > 0) {
                  return (<MusicCard
                    key={ music }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
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
