'use client'
import styles from './Avatar.module.css'

export default function Avatar({ alt, src }) {
  return (
    <div>
      <img className={styles.avatar} src={src} alt={alt} />
    </div>
  )
}