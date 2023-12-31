'use client'
import { useEffect, useState } from 'react';
import styles from './Home.module.css'
import Devit from '../components/Devit/page';
import useUser from '../hooks/useUser';
import { listenLatestTweets } from '../firebase/client';
import Avatar from '../components/Avatar/page';
import Link from 'next/link';
import Create from '../components/icons/Create';
import Home from '../components/icons/Home';
import Search from '../components/icons/Search';
import Head from 'next/head';

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user =useUser()

  useEffect(() => {
    let unsubscribe
    if(user){
      unsubscribe = listenLatestTweets(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user]);

  return (
    <>
      <Head>
        <title>Inicio 🐻 / Devter</title>
      </Head>
      <main>
        <header className={styles.header}>
          {user && (
            <>
              <Avatar alt={user.username} src={user.avatar} className={styles.avatar} />
              <img src="/logo.png" alt="Logo" className={styles.logo} />
            </>
          )}
        </header>
        <section className={styles.section}>
          {timeline.map((devit) => {
            return (
              <Devit
                key={devit.id}
                id={devit.id}
                img={devit.img}
                avatar={devit.avatar}
                createdAt={devit.createdAt}
                userName={devit.userName}
                content={devit.content}
                userId={devit.id}
              />
            );
          })}
        </section>
        <nav className={styles.nav}>
          <div>
            <Link href="/home">
              <Home width={24} height={24} stroke="#09f" />
            </Link>
            <Link href="/Search">
              <Search width={24} height={24} stroke="#09f" />
            </Link>
            <Link href="/compose/tweet">
              <Create width={24} height={24} stroke="#09f" />
            </Link>
          </div>
        </nav>
      </main>
    </>
  );
}
