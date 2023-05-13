import PopupWithForm from './PopupWithForm';
import React, {useRef, useEffect} from 'react';
import { useValidation } from "../hooks/validition.hook";
import ErrorMessage from './ErrorMessage';


export default function EditAvatarPopup(props) {

  const avatarRef  = useRef();

  const { resetForm, values, handleChange, errors,  isValid } =
    useValidation()

  useEffect( ()=> {
    avatarRef.current.value = '';
    }, [props.isOpen]
  )

  // function handleChangeAvatar() {
  //   return avatarRef.current.value
  // }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onUpdateAvatar({
        avatar: avatarRef.current.value
      })
      resetForm();
    }
  }


  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseOverlay={props.onCloseOverlay}
      buttonText={props.onLoading ? `Сохранение...` : `Сохранить`}
      name="popupEditAvatar"
      title="Обновить аватар"
      form={"editAvatarForm"}      
    >
      <label className="popup__label">
        <input
          id="avatar"
          className="popup__input popup__input_link-avatar"
          name="avatar"
          type="url"
          placeholder="Введите ссылку URL"
          required
          onChange={handleChange}
          value={values.avatar || ""} 
          ref={avatarRef}
        />
        <ErrorMessage message={errors.avatar} />
      </label>
    </PopupWithForm>
  );
}