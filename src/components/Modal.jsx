const ModalWindow = ({ largeImage, closeModal }) => {
  return (
    <div className="overlay" onClick={() => closeModal()}>
      <div className="modal">
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
};

export default ModalWindow;
