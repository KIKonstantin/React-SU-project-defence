import { useEffect, useState } from 'react';
import styles from './MessageBox.module.css';

export const MessageBox = ({ message, id }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <li key={id} className={styles.messageBox}>
      {message}
    </li>
  ) : null;
};
