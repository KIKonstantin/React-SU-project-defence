import { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthContext"
import * as favoritesService from '../../services/favoritesService'
import styles from './Favorites.module.css'
import { Link } from "react-router-dom"
export const Favorites = () => {
    const { userId } = useAuthContext();
    const [favoritesList, setFavoritesList] = useState([]);
    useEffect(() => {
        favoritesService.getAllAndFetch(userId)
        .then(result => {
            const books = result.map( x => x.book);
            const uniqueBooks = books.filter((book, index, self) =>
            index === self.findIndex((b) => (
            b._id === book._id
            ))
            );
            setFavoritesList(uniqueBooks);
        })
    }, [])
   
    return (
      <div className={styles.favorites}>
      {favoritesList.map((x) => (
      <div key={x._id} className={styles.book}>
        <Link to={`/catalog/${x._id}`}  className={styles.bookImage}>
          <img src={x.imageUrl} alt={x.title} />
        </Link>
        <div className={styles.bookDetails}>
          <h2 className={styles.bookTitle}>${x.title}</h2>
          <p className={styles.bookAuthor}>By ${x.author}</p>
        </div>
      </div>
      ))}
    </div>
    
      );
}