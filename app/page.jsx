'use client'
import { useEffect } from 'react';
import Button from './components/Button/page';
import ButtonG from './components/ButtonG/page';
import Github from './components/icons/Github';
import Google from './components/icons/Google';
import  {loginWithGithub, loginWithGoogle}   from './firebase/client';
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import useUser,{USER_STATES} from './hooks/useUser';
import Head from 'next/head';



export default function Home() {
  const user = useUser()
  const router = useRouter()
  


  useEffect(() => {
    user && router.replace('/home')
  }, [user])
  


const handleClickGithub = () => {
  loginWithGithub().catch(err => {
    console.log(err)
  })    
};
  
  const handleClickGoogle = () => {
    loginWithGoogle().catch((err) => {
      console.log(err);
    });
  };


  return (
    <>
      <Head>
        <title>devter 🐻 </title>
      </Head>
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
                <div className={styles.btncontainer}>
                  <Button onClick={handleClickGithub}>
                    <div className={styles.button}>
                      <strong>Sign up with Github</strong>
                      <Github fill="#fff" width={24} height={24} />
                    </div>
                  </Button>

                  <ButtonG onClick={handleClickGoogle}>
                    <div className={styles.button}>
                      <strong>Sign up with Google</strong>
                      <Google fill="#fff" width={24} height={24} />
                    </div>
                  </ButtonG>
                </div>
              )}
              {user && USER_STATES.NOT_KNOWN && (
                <img src="/spinner.gif">Loading...</img>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
