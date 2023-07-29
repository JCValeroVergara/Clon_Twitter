'use client';
import useTimeAgo from '@/app/hooks/useTimeAgo';
import useDateTimeFormat from '@/app/hooks/useDateTimeFormat';
import Avatar from '../Avatar/page';
import Link from 'next/link';
import styles from './home.module.css';
import { useRouter } from 'next/navigation';
import Like from '../icons/Like';
import Reuse from '../icons/Reuse';
import { useState } from 'react';

export default function Devit({ avatar, userName,img, content, createdAt, id }) {
  const timeAgo = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const router = useRouter();

  const [isReused, setIsReused] = useState(false);
  const [reuses, setReuses] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = (event) => {
    event.stopPropagation()
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    } 
    setIsLiked(!isLiked);
  };


  const handleReuse = (event) => {
    event.stopPropagation()
    if (isReused) {
      setReuses(reuses - 1);
    } else {
      setReuses(reuses + 1);
    } 
    setIsReused(!isReused);
  };


  const handleArticleClick = (event) => {
    event.preventDefault();
    router.push(`/status/${id}`);
  };
  


  return (
    <div className={styles.main}>
      <article onClick={handleArticleClick} className={styles.article} key={id}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header className={styles.envia}>
            <div>
              <strong>{userName}</strong>
            </div>
            <span>. </span>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <div>
                <time title={createdAtFormated}>{timeAgo}</time>
              </div>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img className={styles.img} src={img} />}
          <div className={styles.interactions}>
            <span>
              {'Like'}({likes})
            </span>
            <button onClick={handleLike} className={styles.buttons}>
              <Like width={20} height={20} stroke="#09f" />
            </button>
            <span>
              {'Reuse'}({reuses})
            </span>
            <button onClick={handleReuse} className={styles.buttons}>
              <Reuse width={20} height={20} stroke="#09f" />
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}