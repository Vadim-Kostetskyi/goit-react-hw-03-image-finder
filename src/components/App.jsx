import './styles.css';
import { Component } from 'react';
import Form from './Searchbar';
import Galery from './ImageGallery';
import LoadMore from './Button';
import ModalWindow from './Modal';
import { ColorRing } from 'react-loader-spinner';

class ImageFinder extends Component {
  state = {
    URL: 'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12',
    baseUrl: 'https://pixabay.com/api/',
    key: '32447292-607f396f27b1a7487e1dc502e',
    // q,
    // page,
    // key,
    // image_type,
    // orientation,
    // per_page,
    // id,
    // webformatURL,
    // largeImageURL,
    imageNameInput: '',
    page: 1,
    per_page: 12,
    images: null,

    LoadMorePics: false,
    isModalOpen: false,
    largeImageUrl: '',
    status: 'idle',
  };
  idle;
  panding;
  resolved;
  resolvedAllPic;
  reject;

  componentDidUpdate(prevState, prevProps) {
    if (
      prevProps.images !== this.state.images ||
      (prevProps.imageNameInput === this.state.imageNameInput &&
        this.state.LoadMorePics === false)
    ) {
      console.log('er');
      return;
    }
    if (
      prevProps.imageNameInput &&
      prevProps.imageNameInput !== this.state.imageNameInput
    ) {
      this.setState({ images: [], status: 'panding' });
    }
    if (!this.state.images) {
      this.setState({ status: 'panding' });
    }

    const { baseUrl, key, imageNameInput, page, per_page } = this.state;
    const imageName = imageNameInput.trim();
    if (!imageName) {
      alert('Введіть назву картинки');
      this.setState({ status: 'idle' });
      return;
    }
    const url = `${baseUrl}?q=${imageName}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const imageArray = data.hits;

        this.state.images
          ? this.setState({ images: [...this.state.images, ...imageArray] })
          : this.setState({ images: imageArray });
        imageArray.length < 12
          ? this.setState({ status: 'resolvedAllPic' })
          : this.setState({ status: 'resolved' });
      })
      .catch(error => console.log(error));
    this.setState({ LoadMorePics: false });
  }

  loadMorePictures = () => {
    const pageNumber = this.state.page + 1;
    this.setState({ page: pageNumber, LoadMorePics: true });
  };

  getSubmitValue = value => {
    this.setState({ imageNameInput: value });
  };

  openModalWindow = url => {
    this.setState({ largeImageUrl: url });
    this.setState({ isModalOpen: true });
  };

  closeModalWindow = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, status, largeImageUrl, isModalOpen } = this.state;

    if (status === 'idle') {
      return (
        <div className="image-box">
          <Form onSubmit={this.getSubmitValue} />
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <div className="image-box">
          <Form onSubmit={this.getSubmitValue} />
          <div className="box">
            <Galery image={images} largePic={this.openModalWindow} />
            <LoadMore morePictures={this.loadMorePictures} />
          </div>
          {isModalOpen && (
            <ModalWindow
              largeImage={largeImageUrl}
              closeModal={this.closeModalWindow}
            />
          )}
        </div>
      );
    }

    if (status === 'resolvedAllPic') {
      return (
        <div className="image-box">
          <Form onSubmit={this.getSubmitValue} />
          <div>
            <Galery image={images} largePic={this.openModalWindow} />
          </div>
          {isModalOpen && (
            <ModalWindow
              largeImage={largeImageUrl}
              closeModal={this.closeModalWindow}
            />
          )}
        </div>
      );
    }
    if (status === 'panding') {
      return (
        <div className="image-box">
          <Form onSubmit={this.getSubmitValue} />
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
          />
        </div>
      );
    }
  }
}

export const App = () => {
  return <div>{<ImageFinder />}</div>;
};