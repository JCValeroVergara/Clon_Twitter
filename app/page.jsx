'use client'
import { useEffect } from 'react';
import Button from './components/Button/page';
import Github from './components/icons/Github';
import  {loginWithGithub}   from './firebase/client';
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import useUser,{USER_STATES} from './hooks/useUser';



export default function Home() {
  const user = useUser()
  const router = useRouter()
  


  useEffect(() => {
    user && router.replace('/home')
  }, [user])
  


const handleClick = () => {
  loginWithGithub().catch(err => {
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
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <div className={styles.button}>
                  <Github fill="#fff" width={24} height={24} />
                  <strong>  Sign up with Github</strong>
                </div>
              </Button>
            )}
            {user && USER_STATES.NOT_KNOWN && <img src='/spinner.gif'>Loading...</img>}
          </div>
        </div>
      </div>
    </main>
  );
}
