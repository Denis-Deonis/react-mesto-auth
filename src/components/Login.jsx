import React from 'react';
import { useValidation } from "../hooks/validition.hook";
import ErrorMessage from './ErrorMessage';


export default function Login(props) {

  const { values, handleChange, errors, isValid,  } =  useValidation();

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onLogin(values.email,  values.password ) 
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.email} />
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          autoComplete="on"
          minLength="4"
          required
          value={values.password}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.password} />
        <button
          className={`auth__submit ${
            !isValid
              ? 'popup__save_disabled'
              : ''
          }`}
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>

      </form>
    </section>
  )

}
