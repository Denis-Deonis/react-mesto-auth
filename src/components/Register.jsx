import React from 'react';
import { useInput } from '../hooks/input.hook';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';

export default function Register(props) {

  // const email = useInput('', { isEmail: true });
  // const password = useInput('');

  const {values, onChange, resetForm, errors, isValid} = useInput();

  useEffect(() => {
    resetForm();
  }, [ props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onRegister({email:values.email, password: values.password})
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
          value={values.email || ""}
          onChange={onChange}
        />
        <ErrorMessage message={errors} />
        <input
          className="auth__input"
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
            !email.isValid.result || !password.isValid.result
              ? 'popup__save_disabled'
              : ''
          }`}
          type="submit"
          disabled={!email.isValid.result || !password.isValid.result}
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