'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import styles from './registro.module.css';
import { crearCuentaEmailPassword, uploadImage } from '../firebase/client';
import Button from '../components/Button/page';
import { useRouter } from 'next/navigation';
import EyeOpen from '../components/icons/eyeOpen';
import EyeClose from '../components/icons/eyeClose';



export default function Registro() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [imgURL, setImgURL] = useState(null);
  const [task, setTask] = useState(null);
  const [errors, setErrors] = useState({
    start: true,
  });
  const router = useRouter();

  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');

  const [form, setForm] = useState({
    name: '',
    email: email || '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setForm({
      ...form,
      email: email || '',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

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
    crearCuentaEmailPassword({
      email: form.email,
      password: form.password,
      name: form.name,
      image: imgURL,
    })
      .then((res) => {
        console.log(res);
        router.push('/authmail');
      }
    )
      .catch((err) => {
        console.log(err);
      }
    );
  };

   useEffect(() => {
    if (task) {
      let onProgress = () => {}
      let onError = (err) => {
        console.log(err)
      }
      let onComplete = () => {
        console.log('onComplete')
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
   }, [task]);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const task = uploadImage(file)
    setTask(task)
  };


  return (
    <div className={styles.container}>
      <h1>Registro</h1>
      <form id="registerForm" onSubmit={handleRegistro}>
        <span>Ingrese su nombre</span> <br />
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          className={styles.input}
          onChange={handleChange}
          value={form.name}
        />{' '}
        <br />
        <span>Ingrese su email</span> <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className={styles.input}
          onChange={handleChange}
          value={form.email}
        />{' '}
        <br />
        <span>Ingrese su contraseña</span> <br />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            className={styles.input}
            onChange={handleChange}
            value={form.password}
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
            name="confirmPassword"
            className={styles.input}
            onChange={handleChange}
            value={form.confirmPassword}
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
        
            <label htmlFor="imageInput" className={styles.labelImage}>
          <strong>Seleccionar imagen</strong>
            </label>
          <input
          type="file"
          placeholder="Imagen"
            name="imageInput"
            id="imageInput"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.imageInput}
        />
        
        <br />
        <div>
          {imgURL && (
            <img
              src={imgURL}
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