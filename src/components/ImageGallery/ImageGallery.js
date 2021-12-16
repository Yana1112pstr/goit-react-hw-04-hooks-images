import React from "react";
import s from "./ImageGallery.module.css";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, onClick }) => {
  const { imageGallery, imageGalleryItem } = s;
  return (
    <ul className={imageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li key={id} className={imageGalleryItem}>
          <ImageGalleryItem
            src={webformatURL}
            alt={tags}
            largeImage={largeImageURL}
            onClick={onClick}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
