import React from 'react';
import { useValidation } from "../hooks/validition.hook";
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';

export default function Register(props) {

  const { values, handleChange, errors, isValid,  } =  useValidation();

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onRegister(values.email,  values.password) 
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
        <div className="auth__signup">
          <p className="auth__signup_text">
            Уже зарегистрированы?{' '}
          </p>
          <Link
            to={"/sign-in"}
            className="auth__signup_link"
          >
            Войти
          </Link>
        </div>
      </form>
    </section>
  )


}