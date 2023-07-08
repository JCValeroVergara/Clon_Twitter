'use client'
import { useEffect, useState } from 'react';
import styles from './Home.module.css'
import Devit from '../components/Devit/page';

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then(res => res.json())
      .then(setTimeline)
  }, []);

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
              username={devit.username}
              avatar={devit.avatar}
              message={devit.message}
              id={devit.id}
            />
          );
        })}
      </section>
      <nav className={styles.nav}></nav>
    </main>
  );
}
