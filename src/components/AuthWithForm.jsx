import React, { useEffect } from 'react';
import useValidation from '../hooks/validate.hook';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';




export default function AuthWithForm(props) {

  // const [password, setPassword] = useState('');  
  // const [email, setEmail] = useState('');  


  const { values, handleChange, errors, resetForm } = useValidation();

  useEffect(() => {
    resetForm();
  }, [ props.isOpen]);



  function handleSubmit(evt) {
    evt.preventDefault()
    props.onSubmit({email:values.email, password: values.password})
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
          value={values.email || ""}
          onChange={handleChange}
          autoComplete="off"
        />
        <ErrorMessage message={errors} />
        <input
          className="auth__input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          value={values.password || ""}
          onChange={handleChange}
          autoComplete="off"
          minLength="4"
        />
        <ErrorMessage message={errors} />
        <button
          className={`auth__submit ${
            !props.buttonDisabled
              ? 'popup__save_disabled'
              : ''
          }`}
          type="submit"
          disabled={!props.buttonDisabled}
        >
          { props.buttonText}
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