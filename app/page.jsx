'use client'
import { useEffect, useState } from 'react';
import Button from './components/Button/page';
import Github from './components/icons/Github';
import  {loginWithGithub, onAuthStateChanged}   from './firebase/client';
import styles from './page.module.css'
import Avatar from './components/Avatar/page';



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
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <div className={styles.button}>
                  <Github fill="#fff" width={24} height={24} />
                  <strong>  Sign up with Github</strong>
                </div>
              </Button>
            )}
            {user && user.avatar && (
              <div className={styles.imagenAva}>
                <Avatar src={user.avatar} alt={user.username} />
                <strong className={styles.username}>{user.username}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
