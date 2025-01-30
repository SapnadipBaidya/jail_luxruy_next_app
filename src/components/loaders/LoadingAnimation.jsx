// components/LoadingAnimation.tsx
import React from 'react';
import styles from './LoadingAnimation.module.css'; // Import CSS module

export default function LoadingAnimation() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}