import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React, { useState, useEffect } from "react"

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateUser({
      name: name,
      about: about,
    })
  }

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeAbout(evt) {
    setAbout(evt.target.value)
  }


  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay} 
      buttonText={props.onLoading ? `Сохранение...` : `Сохранить`}
      name={'edit'}
      form={'profileData'}
      title={'Редактировать профиль'}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_name"
          name="name"
          placeholder="Имя"
          required
          type="text"
          minLength="2"
          maxLength="40"
          id="nameProfile"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="nameProfile-error error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_job"
          name="about"
          placeholder="О себе"
          required
          type="text"
          minLength="2"
          maxLength="200"
          id="aboutProfile"
          value={about || ""}
          onChange={handleChangeAbout}
        />
        <span className="aboutProfile-error error"></span>
      </label>
    </PopupWithForm>
  );
}