
import useTimeAgo from '@/app/hooks/useTimeAgo';
import Avatar from '../Avatar/page';
import styles from './home.module.css';

export default function Devit({ avatar, username,img, content, createdAt, id }) {
  const timeAgo = useTimeAgo(createdAt);

  return (
    <div className={styles.main}>
      <article className={styles.article} key={id}>
        <div>
          <Avatar alt={username} src={avatar} />
          
          
        </div>
        <section>
          <header className={styles.envia} >
            <div>
            <strong>{username}</strong>
            </div>
            <span>. </span>
            <div>
            <p>{timeAgo}</p>
            </div>
          </header>
          <p>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </div>
  );
}