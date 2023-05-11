import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup  ${props.isOpen && "popup_opened"}`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onMouseDown={props.onClose}
        />
        <form
          className="popup__form"
          name={props.form}
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__content">
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button
              className={`popup__save ${
                !props.buttonDisabled && "popup__save_disabled"
              }`}
              disabled={!props.buttonDisabled}
              type="submit"
            >
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
