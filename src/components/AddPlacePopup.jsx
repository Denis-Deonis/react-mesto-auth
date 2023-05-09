import PopupWithForm from './PopupWithForm';
import React, { useEffect } from 'react';
import { useInput } from '../hooks/input.hook'
import ErrorMessage from './ErrorMessage'

export default function AddPlacePopup(props) {

  const name = useInput('');
  const url = useInput('', { isUrl: true });

  useEffect(() => {
    name.setValue('')
    url.setValue('')
    name.clearErrorMessage()
    url.clearErrorMessage()
  }, [ props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name.value, link: url.value 
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
          {...name}
        />
        <ErrorMessage message={name.isValid.errorMessage} />
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_image-link"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          id="link"
          {...url}
        />
        <ErrorMessage message={url.isValid.errorMessage} />
      </label>
    </PopupWithForm>
  );
}