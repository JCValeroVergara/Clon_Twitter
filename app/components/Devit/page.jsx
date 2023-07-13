
import Avatar from '../Avatar/page';
import styles from './home.module.css';

export default function Devit({ avatar, userName, content, createdAt, id }) {
  return (
    <>
      <article className={styles.article} key={id}>
        <div>
          <Avatar alt={userName} src={avatar} />
          <span>.</span>
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Date>{createdAt}</Date>
          </header>
          <p>{content}</p>
        </section>
      </article>
    </>
  );
}