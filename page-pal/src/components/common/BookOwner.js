import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useBookContext } from "../../contexts/BookContext";

export const BookOwner = ({
    children
}) => {
  const { bookId } = useParams();  
  const { getBook } = useBookContext();
  const { userId } = useAuthContext();
  const currentGame = getBook(bookId);

  if(currentGame && currentGame._ownerId !== userId) {
    return <Navigate to={`/catalog/${bookId}`} replace/>
  }
  return children ? children : <Outlet />
};