import React from 'react';
import { useInput } from '../hooks/input.hook';
import ErrorMessage from './ErrorMessage';


export default function Login(props) {

  const email = useInput('', { isEmail: true });
  const password = useInput('');

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onLogin(email.value, password.value)
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
          {...email}
        />
        <ErrorMessage message={email.isValid.errorMessage} />
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          autoComplete="on"
          minLength="4"
          required
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
          Войти
        </button>

      </form>
    </section>
  )

}
