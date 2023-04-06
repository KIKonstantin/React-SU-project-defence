import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";
import { bookServiceFactory } from "../../services/bookService";
import { useEffect, useState } from "react";

import styles from './BookDetails.module.css';

export default function BookDetails(){
    const [book, setBook] = useState({});
    const { bookId } = useParams();
    const { userId, isAuthenticated, token } = useAuthContext();
    const bookService = bookServiceFactory(token);
    const navigate = useNavigate();

    useEffect(() =>{
        bookService.getOne(bookId)
        .then(result => {
            setBook(result)
        })
    }, [])
    
    return(
        <article className={styles.bookContainer} >
            <img src={book.imageUrl} alt={`Cover image of ${book.title}`}/>
            <section className={styles.bookDetails}>
                <h3 style={{fontSize:'2.5rem'}}>{book.title} - {book.author}</h3>
                <div className={styles.bookInfo}>
                    <p style={{fontSize:'1.4rem'}}>{book.summary}</p>
                    <p style={{fontSize:'1.3rem', marginTop:'12px'}}>Ganre: {book.genre}</p>
                    <p>pages: {book.pages}</p>
                </div>
                <div className={styles.buttons}>
                 {isAuthenticated &&  ( <div className={styles.guestButtons}>
                        <button className={styles.favorites}>Add to favorites</button>
                        <button className={styles.rate}>Rate</button>
                        <button className={styles.comment}>Leave a note</button>
                    </div>)}
                    {/* TODO: isOwner buttons */}
                </div>
            </section>
        </article>

    );
};