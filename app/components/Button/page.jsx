'use client'
import styles from './Button.module.css'

export default function Button({ children, onClick, disabled, type }) {
  return (
    <button disabled={disabled} onClick={onClick || null} type={type || 'button'}
      className={styles.button}>
      {children}
    </button>
  )
}