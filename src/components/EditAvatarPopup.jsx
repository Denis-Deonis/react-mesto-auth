import PopupWithForm from './PopupWithForm';
import React, {useRef, useEffect} from 'react';


export default function EditAvatarPopup(props) {

  const avatarRef  = useRef();

  useEffect( ()=> {
    avatarRef.current.value = '';
    }, [props.isOpen]
  )

  function handleChangeAvatar() {
    return avatarRef.current.value
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
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
          onChange={handleChangeAvatar}
          ref={avatarRef}
        />
        <span className="avatar-error error"></span>
      </label>
    </PopupWithForm>
  );
}