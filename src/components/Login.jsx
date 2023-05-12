import React, { useEffect } from 'react';
import useValidation from '../hooks/validate.hook';
import ErrorMessage from './ErrorMessage';


export default function Login(props) {

  const { values, handleChange, errors, isValid, resetForm } = useValidation();

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

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
          onChange={handleChange}
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
          onChange={handleChange}
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
