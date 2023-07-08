'use client'
import styles from './Button.module.css'

export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick}
      className={styles.button}>
      {children}
    </button>
  )
}