'use client'
import { useEffect, useState } from 'react';
import Button from './components/Button/page';
import Github from './components/icons/Github';
import  {loginWithGithub, onAuthStateChanged}   from './firebase/client';
import styles from './page.module.css'



export default function Home() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);
  


const handleClick = () => {
  loginWithGithub().then(setUser).catch(err => {
    console.log(err)
  })    
};


  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <img src="/logo.png" alt="Logo" className={styles.imagen} />
          <h1>
            Welcome to <a href="https://Nextjs.org">Devter!</a>
          </h1>
          <h2>
            Talk about development <br /> with developers 👨‍💼👩‍💼{' '}
          </h2>
          <div className={styles.button}>
            {
              user === null && 
            <Button onClick={handleClick} >
              <Github fill="#fff" width={24} height={24} />
              Sign up with Github
                </Button> 
            }
            {
              user && user.avatar && <div>
                <img className={styles.avatar} src={user.avatar} alt="Avatar" />
                <strong className={styles.username} >{user.username}</strong>
              </div>
            }
          </div>
        </div>
      </div>
    </main>
  );
}
