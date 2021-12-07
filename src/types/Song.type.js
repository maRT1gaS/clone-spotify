import PropTypes from 'prop-types';

export const TSong = {
  name: PropTypes.string,
  url: PropTypes.string,
  artist: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  album: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  duration: PropTypes.number,
  id: PropTypes.string,
};
