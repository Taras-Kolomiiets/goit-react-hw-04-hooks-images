import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./imageGallery.module.css";
import ImageGalleryItem from "../imageGalleryItem";
import Modal from "../modal";

const ImageGallery = ({ images }) => {
  const [modal, setModal] = useState(false);
  const [imageIdx, setImageIdx] = useState(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  const showModal = (idx) => {
    setImageIdx(idx);
    setModal(true);
  };

  return (
    <>
      <ul className={classes.ImageGallery}>
        {images.map((image, index) => {
          return (
            <ImageGalleryItem
              image={image}
              key={image.id}
              showModal={() => {
                showModal(index);
              }}
            />
          );
        })}
      </ul>
      {modal && (
        <Modal onClose={toggleModal}>
          <img
            src={images[imageIdx].largeImageURL}
            alt={images[imageIdx].tags}
          />
        </Modal>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
