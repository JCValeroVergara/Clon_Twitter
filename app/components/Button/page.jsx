'use client'
import styles from './Button.module.css'

export default function Button({ children, onClick, disabled }) {
  return (
    <button disabled={disabled} onClick={onClick}
      className={styles.button}>
      {children}
    </button>
  )
}