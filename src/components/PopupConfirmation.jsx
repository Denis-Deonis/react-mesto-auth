import PopupWithForm from "./PopupWithForm";
import React from 'react';

export default function PopupConfirmation(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete(props.card);
  }

  return(
    <PopupWithForm 
      isOpen={props.isOpen}   
      onClose={props.onClose}  
      onCloseOverlay={props.onCloseOverlay} 
      buttonText={props.onLoading ? `Удаление...` : `Да`}
      onSubmit={handleSubmit}
      name="popupConfirmation"
      title="Вы уверены?"
    />
  )
}