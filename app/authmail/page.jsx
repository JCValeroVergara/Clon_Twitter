'use client'
import styles from './automail.module.css';
import Button from '../components/Button/page';
import { useEffect, useState } from 'react';
import EyeOpen from '../components/icons/eyeOpen';
import EyeClose from '../components/icons/eyeClose';
import { loginWithMail } from '../firebase/client';
import { useRouter } from 'next/navigation';


export default function AuthMail() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    start: true
  });
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function validarForm(form) {
    console.log(form);
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    errors.email = !form.email.trim()
      ? 'El campo "Email" es requerido'
      : !regexEmail.test(form.email)
      ? 'El campo "Email" no es válido'
      : '';

    errors.password = !form.password.trim()
      ? 'El campo "Contraseña" es requerido'
      : form.password.trim().length < 6
      ? 'El campo "Contraseña" debe tener al menos 6 caracteres'
      : form.password.trim().length > 15
      ? 'El campo "Contraseña" debe tener menos de 15 caracteres'
          : '';
    return errors;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors(validarForm({ ...form, [name]: value }));
  };


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginWithMail = (event) => {
    event.preventDefault();

    const formErrors = validarForm({ email: form.email, password: form.password });
    setErrors(formErrors);

    console.log(errors);
    if (!errors.email && !errors.password) {
      loginWithMail(form.email, form.password)
        .then((res) => {
          router.push('/home');
        })
        .catch((err) => {
          console.log(err);
          err.code === 'auth/argument-error'
            ? router.push('/registro')
            : err.code === 'auth/wrong-password'
            ? 'Contraseña incorrecta'
            : err.code === 'auth/user-not-found'
            ? 'Usuario no encontrado' && router.push(`/registro?email=${form.email}`)
            : err.code === 'auth/too-many-requests'
            ? 'Demasiados intentos, intente mas tarde'
            : 'Ha ocurrido un error, por favor inténtelo de nuevo';
        });
    }
  };

  return (
    <form id='authForm' onSubmit={handleLoginWithMail} className={styles.container}>
      <h1>Sing Up</h1>
      <span>Enter your email</span> <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        className={styles.input}
        onChange={handleChange}
      />{' '}
      <br />
      <span>Enter your password</span> <br />
      <div className={styles.passwordContainer}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          name="password"
          value={form.password}
          className={styles.input}
          onChange={handleChange}
        />
        <button className={styles.buttonEye} onClick={handleShowPassword}>
          {showPassword ? (
            <EyeOpen width={24} height={24} stroke="#09f" />
          ) : (
            <EyeClose width={16} height={16} stroke="#09f" />
          )}
        </button>
        <br />
      </div>
      <Button type="submit">
        <strong>Sign up</strong>
      </Button>
    </form>
  );
}