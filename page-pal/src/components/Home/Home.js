import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.bookWrapper}>
        <img className={styles.book} src="images/book.png" alt="bookhero" />
      </div>
      <div className={styles.sectionWrapper}>
        <section className={styles.join}>
          <Link to='/login'>Log in</Link>
          <Link to='/register'>Sign Up</Link>
        </section>
      </div>

    </div>
    <div className={styles.trendyBooks}>
        <div className={styles.bookCard}>
            
        </div>
    </div>
    </>
  );
};
