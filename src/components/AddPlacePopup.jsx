import PopupWithForm from './PopupWithForm';
import React, { useEffect } from 'react';
import { useInput } from '../hooks/input.hook'
import ErrorMessage from './ErrorMessage'

export default function AddPlacePopup(props) {

  const {values, onChange, resetForm, errors, isValid} = useInput();

  useEffect(() => {
    resetForm();
  }, [ props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name : values.name, link: values.link
    });
}


  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay}
      onSubmit={handleSubmit}
      name={"add"}
      form={"newCard"}
      title={"Новое место"}
      buttonText={props.onLoading ? `Сохранение...` : `Сохранить`}
      buttonDisabled={isValid}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_title"
          name="name"
          placeholder="Название"
          required
          type="text"
          minLength="2"
          maxLength="30"
          id="title"
          value={values.name || ""}
          onChange={onChange}
        />
        <ErrorMessage message={errors} />
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_image-link"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          id="link"
          value={values.link || ""}
          onChange={onChange}
        />
        <ErrorMessage message={errors} />
      </label>
    </PopupWithForm>
  );
}