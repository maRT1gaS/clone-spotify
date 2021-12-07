import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardsList, MusicList, Profile, Loader } from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { ARTIST } from '../../redux/actionTypes';
import { TSong } from '../../types/Song.type';

const Artist = ({ isLoading, artist, loadingArtist }) => {
  const { id } = useParams();

  useEffect(() => {
    if (!artist?.id || artist.id !== id) {
      loadingArtist(`/artists/${id}`, ARTIST);
    }
  }, [artist.id, id, loadingArtist]);

  return (
    <>
      <Helmet>
        <title>
          {artist?.id ? `Артист - ${artist.name}` : 'Артист не найден'}
        </title>
      </Helmet>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {artist?.id ? (
              <>
                <Profile imageUrl={artist.imageUrl} name={artist.name} />
                {artist.albums.length > 0 && (
                  <CardsList
                    name='Альбомы '
                    type='album'
                    data={artist.albums}
                  />
                )}
                {artist.popular.length > 0 && (
                  <MusicList name='Песни' songs={artist.popular} />
                )}
              </>
            ) : (
              <h2>ddd</h2>
            )}
          </>
        )}
      </>
    </>
  );
};

Artist.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  artist: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    albums: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    popular: PropTypes.arrayOf(PropTypes.shape(TSong)),
  }).isRequired,
  loadingArtist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  artist: state.loadingData.artist,
});

const mapDispatchToProps = {
  loadingArtist: (url, type) => loadingAction(url, type),
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
