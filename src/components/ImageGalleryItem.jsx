const GalleryItem = ({ image, largePic }) => {
  return image.map(({ webformatURL, id, tags, largeImageURL }) => {
    return (
      <li className="imageGalleryItem" key={id}>
        <img
          className="imageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={() => largePic(largeImageURL)}
        />
      </li>
    );
  });
};

export default GalleryItem;
