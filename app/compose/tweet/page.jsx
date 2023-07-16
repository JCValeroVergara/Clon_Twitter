'use client'
import Button from '@/app/components/Button/page'
import styles from './tweet.module.css'
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';

import { addTweet, uploadImage } from '@/app/firebase/client';
import { useRouter } from 'next/navigation'
import Head from 'next/head';
import Avatar from '@/app/components/Avatar/page';

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task,setTask ] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  useEffect(() => {
    if (task) {
      let onProgress = () => {}
      let onError = () => {}
      let onComplete = () => {
        console.log('onComplete')
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task]);

  const handleSumit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addTweet({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      } )
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  } 

  const handleDrop = (event) => {
    event.preventDefault() 
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = event.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  } 


  const isButtonDisabled = !message.trim() || status === COMPOSE_STATES.LOADING

  const textareaClassName = `${styles.textarea} ${
    drag === DRAG_IMAGE_STATES.DRAG_OVER ? styles['drag-hover'] : ''
  }`;

  return (
    <>
      <Head>
        <title>Crea un Tweet: / Devter</title>
      </Head>

      <div className={styles.main}>
        <section className={styles.formcontainer}>
          {user && (
            <section className={styles.avatarcontainer}>
              <Avatar src={user.avatar} />
            </section>
          )}
          <form onSubmit={handleSumit}>
            <textarea
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={textareaClassName}
              placeholder="Qué esta pasando?"
              value={message}
            ></textarea>
            {imgURL && (
              <section className={styles.removeimg}>
                <button
                  className={styles.btton}
                  onClick={() => setImgURL(null)}
                >
                  x
                </button>
                <img className={styles.img} src={imgURL} />
              </section>
            )}
            <div className={styles.button}>
              <Button disabled={isButtonDisabled}>
                <strong>Tweet</strong>
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}