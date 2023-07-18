'use client';
import useTimeAgo from '@/app/hooks/useTimeAgo';
import useDateTimeFormat from '@/app/hooks/useDateTimeFormat';
import Avatar from '../Avatar/page';
import Link from 'next/link';
import styles from './home.module.css';
import { useRouter } from 'next/navigation';

export default function Devit({ avatar, username,img, content, createdAt, id }) {
  const timeAgo = useTimeAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const router = useRouter();


  const handleArticleClick = (event) => {
    event.preventDefault();
    router.push(`/status/${id}`);
  };
    

  return (
    <div className={styles.main}>
      <article onClick={handleArticleClick} className={styles.article} key={id}>
        <div>
          <Avatar alt={username} src={avatar} />
          
          
        </div>
        <section>
          <header className={styles.envia} >
            <div>
            <strong>{username}</strong>
            </div>
            <span>. </span>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <div><time title={createdAtFormated} >{timeAgo}</time></div>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </div>
  );
}