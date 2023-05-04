import React from 'react';
import AuthWithForm from './AuthWithForm';

export default function Register(props) {
  function handleSubmit(email, password) {
    props.onRegister(email, password);
  }

  return (
    <AuthWithForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    />
  );
}