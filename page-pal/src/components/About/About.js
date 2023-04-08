import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './About.module.css';
import { faCloud, faHeart, faNotesMedical, faWarehouse } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Welcome to our Book Application app! With our app, you can store, upload, take notes, and like your favorite books. Our app is designed to help book lovers keep track of their reading journey and discover new books to love.
      </p>
      <div className={styles.features}>
        <div className={styles.feature}>
            <FontAwesomeIcon className={styles.icon} icon={faWarehouse} />
          <h2 className={styles.featureTitle}>Store your Books</h2>
          <p className={styles.featureText}>Easily store all of your favorite books in one place.</p>
        </div>
        <div className={styles.feature}>
            <FontAwesomeIcon className={styles.icon} icon={faCloud} />
          <h2 className={styles.featureTitle}>Upload Books</h2>
          <p className={styles.featureText}>Upload your own books to share with the community.</p>
        </div>
        <div className={styles.feature}>
            <FontAwesomeIcon className={styles.icon} icon={faNotesMedical} />
          <h2 className={styles.featureTitle}>Take Notes</h2>
          <p className={styles.featureText}>Take notes on your favorite books and keep track of your thoughts.</p>
        </div>
        <div className={styles.feature}>
            <FontAwesomeIcon className={styles.icon} icon={faHeart} />
          <h2 className={styles.featureTitle}>Like Books</h2>
          <p className={styles.featureText}>Like your favorite books to create a personal library of recommendations.</p>
        </div>
      </div>
    </div>
  );
}
