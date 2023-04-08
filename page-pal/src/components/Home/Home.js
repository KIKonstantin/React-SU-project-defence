import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useAuthContext } from '../../contexts/AuthContext';
import { useBookContext } from '../../contexts/BookContext';
import LastAdded from './LastAdded/LastAdded';
import { bookServiceFactory } from '../../services/bookService';
import { useEffect, useState } from 'react';

export default function Home() {
  const { isAuthenticated, userEmail } = useAuthContext();
  const { sortedBooks } = useBookContext();
  const bookService = bookServiceFactory();
  const [loading, setLoading] = useState(true);
  const [lastAddedBooks, setLastAddedBooks] = useState([]);

  useEffect(() => {
    bookService.lastAdded().then((result) => {
      if (Array.isArray(result)) {
        setLastAddedBooks(result);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
        {isAuthenticated ? (
      <div className={styles.container} style={{marginBottom:'128px'}}>
          <div className={styles.welcome} >
            <h1 style={{textAlign:'center'}}>Welcome {userEmail}</h1>
          </div>
      </div>

        ) : (
          <div className={styles.container} style={{height:'500px', width:'500px'}}>

            <div className={styles.bookWrapper}>
              <img
                className={styles.book}
                src="images/book.png"
                alt="bookhero"
              />
            </div>
            <div className={styles.sectionWrapper}>
              <section className={styles.join}>
                <Link to="/login">Log in</Link>
                <Link to="/register">Sign Up</Link>
              </section>
            </div>
          </div>
        )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 style={{width:"100%", borderBottom:'4px solid grey', textAlign:'center', fontSize:'3rem'}}>Trendy Books</h1>
        <div className={styles.newestBooks}>
          {lastAddedBooks.map((x) => (
            <LastAdded key={x._id} {...x} />
          ))}
        </div>
        </>
      )}
    </>
  );
};

