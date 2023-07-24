'use client'
import styles from './ButtonG.module.css'

export default function ButtonG({ children, onClick, disabled }) {
  return (
    <button disabled={disabled} onClick={onClick}
      className={styles.button}>
      {children}
    </button>
  )
}