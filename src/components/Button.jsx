import PropTypes from 'prop-types';
const LoadMore = ({ morePictures }) => {
  return (
    <button className="button" onClick={() => morePictures()}>
      LoadMore
    </button>
  );
};

export default LoadMore;

LoadMore.propTypes = {
  morePictures: PropTypes.func,
};
