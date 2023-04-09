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
          <div className={styles.container} style={{height:'200px', width:'500px', margin:"120px 0", borderRadius:'28px'}}>
            <div className={styles.sectionWrapper}>
              <section className={styles.join}>
              <div className={styles.linkContainer}>
                <Link to="/login" >Log in</Link>
                <p style={{fontSize:'0.7rem'}}>and collect your favorite books</p>
                </div>
                or
                <div className={styles.linkContainer}>
                <Link to="/register" >Sign Up</Link>
                <p style={{fontSize:'1rem'}}>and join us</p>
                </div>
              </section>
            </div>
          </div>
        )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 style={{width:"100%", textAlign:'center', fontSize:'3rem'}}>Trendy Books</h1>
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

