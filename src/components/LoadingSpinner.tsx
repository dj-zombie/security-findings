import React, { FC } from 'react';
import styles from './LoadingSpinner.module.css'

/**
 * A component that displays a loading spinner animation.
 * @returns {JSX.Element} - Returns a div containing a spinner element.
 */
const LoadingSpinner: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
