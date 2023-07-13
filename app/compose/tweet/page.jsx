'use client'
import Button from '@/app/components/Button/page'
import styles from './tweet.module.css'
import useUser from '../../hooks/useUser';
import { useState } from 'react';

import { addTweet } from '@/app/firebase/client';
import { useRouter } from 'next/navigation'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const user = useUser()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  

  const handleSumit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addTweet({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      } )
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <div className={styles.main}>
      <form onSubmit={handleSumit}>
        <textarea onChange={handleChange}
          className={styles.textarea}
          placeholder="Qué esta pasando"
          value={message}
        ></textarea>
        <div>
        <Button disable={isButtonDisabled}><strong>Tweet</strong></Button>
        </div>
      </form>
    </div>
  );
}