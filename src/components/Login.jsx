import React from "react";
import AuthWithForm from "./AuthWithForm";

export default function Login(props) {

  function handleSubmit(email, password) {
    props.onLogin(email, password)
  }

  return (
    <AuthWithForm
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
      isSubmitting={props.isSubmitting}
    />
  )
}
