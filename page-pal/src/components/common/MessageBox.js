import styles from './MessageBox.module.css';

export const MessageBox = ({error}) => {
  <div className={styles.messageBox}>{error}</div>
};
