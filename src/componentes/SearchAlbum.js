import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchAlbum extends React.Component {
  render() {
    const { album } = this.props;
    const { collectionId, artistName, collectionName, artworkUrl100 } = album;
    return (

      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{artistName}</p>
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <p>{collectionName}</p>
        </Link>
      </div>
    );
  }
}
SearchAlbum.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,

};

export default SearchAlbum;
