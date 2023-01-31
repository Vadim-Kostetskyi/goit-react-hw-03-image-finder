const ModalWindow = ({ largeImage, closeModal, keyDown }) => {
  return (
    <div
      className="overlay"
      onClick={() => closeModal()}
      onKeyDown={ev => {
        if (ev.key === 'Escape') {
          closeModal();
        }
      }}
    >
      <div className="modal">
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
};

export default ModalWindow;
