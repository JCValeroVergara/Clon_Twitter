'use client'
import React from "react";
import { useState } from "react";
import styles from './registro.module.css';
import { crearCuentaEmailPassword } from '../firebase/client';
import Button from '../components/Button/page';
import { useRouter } from 'next/navigation';
import EyeOpen from '../components/icons/eyeOpen';
import EyeClose from '../components/icons/eyeClose';



export default function Registro() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    start: true,
  });
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function validarForm(form) {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    errors.name = !form.name.trim()
      ? 'El campo "Nombre" es requerido'
      : form.name.trim().length < 3
      ? 'El campo "Nombre" debe tener al menos 3 caracteres'
      : '';

    errors.email = !form.email.trim()
      ? 'El campo "Email" es requerido'
      : !regexEmail.test(form.email.trim())
      ? 'El campo "Email" no es válido'
      : '';

    errors.password = !form.password.trim()
      ? 'El campo "Contraseña" es requerido'
      : form.password.trim().length < 6
      ? 'El campo "Contraseña" debe tener al menos 6 caracteres'
      : form.password.trim().length > 15
      ? 'El campo "Contraseña" debe tener menos de 15 caracteres'
      : '';

    errors.confirmPassword = !form.confirmPassword.trim()
      ? 'El campo "Confirmar contraseña" es requerido'
      : form.confirmPassword.trim() !== form.password.trim()
      ? 'Las contraseñas no coinciden'
      : '';

    return errors;
  }

  //Para mostrar la contraseña
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //Para guardar los datos del formulario
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validarForm({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleRegistro = (event) => {
    event.preventDefault();

    // crearCuentaEmailPassword(name, email, password)

    //   .then((res) => {
    //     router.push('/home');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <h1>Registro</h1>
      <form id="registerForm" onSubmit={handleRegistro}>
        <span>Ingrese su nombre</span> <br />
        <input
          type="text"
          placeholder="Nombre"
          className={styles.input}
          onChange={handleChange}
        />{' '}
        <br />
        <span>Ingrese su email</span> <br />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          onChange={handleChange}
        />{' '}
        <br />
        <span>Ingrese su contraseña</span> <br />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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
        <span>Confirme su contraseña</span> <br />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Corfime su Password"
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
        <span>Imagen</span> <br />
        <input
          type="file"
          placeholder="Imagen"
          accept="image/*"
          onChange={handleFileChange}
        />{' '}
        <br />
        <div>
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="imagen"
              className={styles.imagen}
            />
          )}
        </div>
        <Button type="submit">
          <strong>Registrar</strong>
        </Button>
      </form>
    </div>
  );
}