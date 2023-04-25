import React from 'react';

export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image popup_img ${props.card &&
        "popup_opened"}`}
      onClick={props.onCloseOverlay}
    >
      <figure className="popup__image-container">
        <button
          className="popup__close-button"
          type="button"
          onMouseDown={props.onClose}
        />
        <img
          className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <figcaption className="popup__image-title">
          {props.card ? props.card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}
