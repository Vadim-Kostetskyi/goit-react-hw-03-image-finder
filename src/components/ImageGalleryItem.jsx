const GalleryItem = ({ image, largePic }) => {
  return image.map(({ webformatURL, id, tags, largeImageURL }) => {
    return (
      <li className="imageGalleryItem" key={id}>
        <a href="#" onClick={() => largePic(largeImageURL)}>
          <img
            className="imageGalleryItem-image"
            src={webformatURL}
            alt={tags}
          />
        </a>
      </li>
    );
  });
};

export default GalleryItem;
