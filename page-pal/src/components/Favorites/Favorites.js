import { useEffect, useState } from "react"
import { useAuthContext } from "../../contexts/AuthContext"
import * as favoritesService from '../../services/favoritesService'

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
        <div>
          {favoritesList.map((x) => (
            <p key={x._id}>{x.title}</p>
          ))}
        </div>
      );
}