'use client'
import { useEffect, useState } from 'react';
import styles from './Home.module.css'
import Devit from '../components/Devit/page';
import useUser from '../hooks/useUser';
import { fetchLatestTweets } from '../firebase/client';

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user =useUser()

  useEffect(() => {
    user &&
    fetchLatestTweets()
      .then(setTimeline)
  }, [user]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map((devit) => {
          return (
            <Devit
              key={devit.id}
              id={devit.id}
              avatar={devit.avatar}
              createdAt={devit.createdAt}
              username={devit.userName}
              content={devit.content}
              userId={devit.id}
            />
          );
        })}
      </section>
      <nav className={styles.nav}></nav>
    </main>
  );
}
