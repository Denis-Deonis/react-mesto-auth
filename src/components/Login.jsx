import React, { useEffect } from 'react';
import { useInput } from '../hooks/input.hook';
import ErrorMessage from './ErrorMessage';


export default function Login(props) {

  const {values, onChange, resetForm, errors, isValid} = useInput();

  useEffect(() => {
    resetForm();
  }, [ props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onLogin({email:values.email, password: values.password})
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit} >
        <input
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={onChange}
        />
        <ErrorMessage message={errors} />
        <input
          className="auth__input"
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="on"
          minLength="4"
          required
          value={values.password || ""}
          onChange={onChange}
        />
        <ErrorMessage message={errors} />
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
