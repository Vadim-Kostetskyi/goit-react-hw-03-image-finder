import { Component } from 'react';

class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = ev => {
    if (ev.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeModal, largeImage } = this.props;
    return (
      <div className="overlay" onClick={() => closeModal()}>
        <div className="modal">
          <img src={largeImage} alt="" />
        </div>
      </div>
    );
  }
}

export default ModalWindow;
