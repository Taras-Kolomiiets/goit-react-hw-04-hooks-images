import React from "react";
import PropTypes from "prop-types";
import classes from "./imageGalleryItem.module.css";

const ImageGalleryItem = ({ image, showModal }) => {
  return (
    <li className={classes.ImageGalleryItem} onClick={showModal}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={classes.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
