import React from 'react';
import SuccessIcon from '../images/InfoToolTip/SuccessIcon.svg';
import FailIcon from '../images/InfoToolTip/FailIcon.svg';

export default function InfoToolTip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : "" }`} >
      <div className="popup__container">
        <button
          title="Закрыть"
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        />
      <div className="popup__tooltip">
        {props.isSuccess ? (
          <>
            <img
              className="popup__tooltip_image"
              src={`${SuccessIcon}`}
              alt="Регистрация прошла успешно."
            />
            <p className="popup__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              className="popup__tooltip_image"
              src={`${FailIcon}`}
              alt="Регистрация не была выполнена."
            />
            <p className="popup__tooltip_message">
              Попробуйте ещё раз! Что-то пошло не так.
            </p>
          </>
        )}
        </div>
      </div>
    </div>
  );
}