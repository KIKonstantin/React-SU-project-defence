import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";
import { bookServiceFactory } from "../../services/bookService";
import { useEffect, useReducer, useState } from "react";
import * as noteService from '../../services/noteService';
import * as favoritesService from '../../services/favoritesService'
import * as likeService from '../../services/likeService'
import { bookReducer } from '../../reducers/bookReducer';

import AddNote from "./AddNote";
import styles from './BookDetails.module.css';
import { useBookContext } from "../../contexts/BookContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";


export default function BookDetails(){
    const [wantsNote, setWantsNote] = useState(false);
    const { bookId } = useParams();
    const { userId, userEmail, isAuthenticated, token } = useAuthContext();
    const { deleteBook } = useBookContext();
    const bookService = bookServiceFactory(token);
    const navigate = useNavigate();
    const [book, dispatch] = useReducer(bookReducer, {});
    const [isAdded, setIsAdded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    useEffect(() => {
        try {
        Promise.all([
            bookService.getOne(bookId),
            noteService.getAll(bookId),
            favoritesService.checkIfAdded(userId, bookId),
            likeService.checkIfLikedByUser(userId, bookId),
            likeService.countLikes(bookId)
        ])
        .then(([bookData, notes, isAdded, isLiked, likes]) => {
            if(bookData.error?.message){
                navigate('/not-found')
            }
            const bookState = ({
                ...bookData,
                notes,
            });

            setIsAdded(isAdded);
            setIsLiked(isLiked)
            setLikes(likes)
            dispatch({
                type: 'BOOK_FETCH',
                payload: bookState,
            })

        })
            
        } catch (error) {
            if (error.response && error.response.status === 404) {
                navigate('/not-found');
              } else {
                console.log(error);
                navigate('/catalog');
              }
        }            
    }, [bookId])


    const onNoteSubmit = async (values) => {
        const response =  await noteService.uploadNote(bookId, values.note);
        dispatch({
            type: 'NOTE_ADD',
            payload: response,
            userEmail
        })

        setWantsNote(false);

    }

    const isOwner = book._ownerId === userId;

    const onDeleteClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmedDelete = confirm(`Are you sure you want to delete ${book.title}?`);
        if(confirmedDelete){
            await bookService.deleteBook(book._id);
            deleteBook(book._id);
            navigate('/catalog');
        }
    }

    const onAddToFavorites = async () => {
        try{
            await favoritesService.addFavorite(bookId);
            setIsAdded(true)
        }catch (error){
            console.log(error)
        }
    }
    
    const onLike = async() => {
        try{
            await likeService.addLike(bookId);
            setLikes(likes+1)
            setIsLiked(true);
        }catch (error){
            console.log(error);
        }
    }


    return(
        <section className={styles.bookDetailsContainer}>
            <article className={styles.bookContainer}>
                <img src={book.imageUrl} alt={`Cover image of ${book.title}`}/>
                <section className={styles.bookDetails}>
                    <h3 style={{fontSize:'2.5rem'}}>{book.title} - {book.author}</h3>
                    <div className={styles.bookInfo}>
                        <p style={{fontSize:'1.4rem'}}>{book.summary}</p>
                        <p style={{fontSize:'1.3rem', marginTop:'12px'}}>Ganre: {book.genre}</p>
                        <p>pages: {book.pages}</p>
                        <p>likes: {likes}</p>
                    </div>
                    <div className={styles.buttons}>
                    {isAuthenticated &&  ( 
                    <div className={styles.guestButtons}>
                        <div className={styles.isAuthenticatedButtons}>
                        {isAdded ? (
                            <button className={styles.addedToFavorites}>Already in favorites</button>

                        ):
                       ( <button className={styles.favorites} onClick={onAddToFavorites}>Add to favorites</button>)

                        }
                            <button className={styles.comment} onClick={() => setWantsNote(!wantsNote)}>Leave a note</button>
                            <button className={styles.rate} onClick={!isLiked ? onLike : undefined} style={{backgroundColor: isLiked && 'green'}}>
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </button>
                        </div>
                        {/* TODO: isOwner buttons */}
                           {isOwner && (
                            <div className={styles.isOwnerButtons}>
                                <Link to={`/catalog/${book._id}/edit`} className="button">Edit</Link>
                                <button className={styles.deleteBook} onClick={onDeleteClick}>Delete Book</button>
                           </div>
                           )}

                        </div>)}
                    </div>
                </section>
            </article>
            <article className={styles.noteContainer}>
                <h2>Users Notes: </h2>
                <ul>
                    {book.notes && Object.values(book.notes).map(n => (
                        <li key={n._id} className={styles.note}>
                            <p>{n.author.email} said: {n.note}</p>
                        </li>
                    ))}
                </ul>
                {(!book.notes?.length && (<p>Be the first to leave a note.</p>))}
            </article>
            {wantsNote && <AddNote onNoteSubmit={onNoteSubmit} />}
        </section>
    );
};