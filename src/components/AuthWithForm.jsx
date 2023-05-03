//import { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { useInput } from '../hooks/input.hook';

export default function AuthWithForm(props) {
  const email = useInput('', { isEmail: true })
  const password = useInput('')

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onSubmit(email, password)
  }

  // function handleEmailChange(evt) {
  //   setEmail(evt.target.value)
  // }

  // function handlePasswordChange(evt) {
  //   setPassword(evt.target.value)
  // }

  return(
    <section className="auth">
      <h2 className="auth__title">{props.title}</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          placeholder="Email"
          name="email"
          type="email"
          required
          // value={email || ""}
          // onChange={handleEmailChange}
          autoComplete="off"
          {...email}
        />
        <ErrorMessage message={email.isValid.errorMessage} />
        <input
          className="auth__input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          // value={password || ""}
          // onChange={handlePasswordChange}
          autoComplete="off"
          minLength="4"
          {...password}
        />
        <ErrorMessage message={password.isValid.errorMessage} />
        <button
          className={`auth__submit ${
            !email.isValid.result || !password.isValid.result
              ? 'popup__save_disabled'
              : ''
          }`}
          type="submit"
          disabled={!email.isValid.result || !password.isValid.result}
        >
          {props.isSubmitting ? "Сохранение..." : props.buttonText}
        </button>
        <div className="auth__signup">
          <p className="auth__signup_text">
            {props.title === "Регистрация" ? "Уже зарегистрированы?" : ""}
          </p>
          <Link
            to={props.title === "Регистрация" ? "sign-in" : "sign-up"}
            className="auth__signup_link"
          >
            {props.title === "Регистрация" ? "Войти" : ""}
          </Link>
        </div>
      </form>
    </section>
  )

}