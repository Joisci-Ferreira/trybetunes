import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, trackName, trackId, onClick, onChecked } = this.props;

    return (
      <div>
        <div>
          <h3>{ trackName }</h3>

          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>

        <div>
          <label htmlFor={ trackId }>
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              onClick={ () => onClick(trackId) }
              defaultChecked={ onChecked }

            />
            Favorita
          </label>
        </div>

      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
