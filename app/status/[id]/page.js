'use client';
import React, { useEffect, useState } from 'react';
import styles from './idTweet.module.css';
import Devit from '@/app/components/Devit/page';
import { useRouter } from 'next/navigation';

export default function DevitPage(props) {
  // console.log('Component Props:', props);

  const { id } = props;
  const tweetId = props.params.id;
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fechTweet() {
      try {
        const apiResponse = await fetch(
          `http://localhost:3000/api/tweet/${tweetId}`
        );
        if (apiResponse.ok) {
          const props = await apiResponse.json();
          setTweet(props);
          setLoading(false);
        } else {
          console.error('Error:', apiResponse);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    fechTweet();
  }, [id]);

  useEffect(() => {
    if (!loading) {
      if (!tweet) {
        router.push('/home')
      }
    }
  }, [loading, tweet]);

  return (
    <div className={styles.main}>
      {!loading && tweet && (
        
      <Devit
        avatar={tweet?.avatar}
        createdAt={tweet?.createdAt}
        id={tweet?.id}
        img={tweet?.img}
        name={tweet?.name}
        content={tweet?.content}
        userName={tweet?.userName}
        />
      )}
      {(loading || !tweet) && <p>Loading...</p>}
    </div>
  );
}
