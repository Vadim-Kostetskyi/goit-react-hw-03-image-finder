import GalleryItem from './ImageGalleryItem';

const Galery = ({ ...props }) => {
  return (
    <ul className="imageGallery">
      <GalleryItem {...props} />
    </ul>
  );
};

export default Galery;
