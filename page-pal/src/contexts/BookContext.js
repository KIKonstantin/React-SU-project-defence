import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookServiceFactory } from "../services/bookService";

export const BookContext = createContext();
export const BookProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [auth, setAuth] = useState({});
    const bookService = bookServiceFactory(auth.accessToken);

    useEffect(() => {
        bookService.getAll()
        .then(result => {
            setBooks(result);
        })
    }, [])

    const onCreateBookSubmit = async (data) => {
        const newBook = await bookService.create(data);
        setBooks(state => [...state, newBook]);
        navigate('/catalog');
    };

    const deleteBook = (bookId) => {
        const updatedBooksCatalog = books.filter(b => b._id !== bookId);
        setBooks(updatedBooksCatalog);
    }
    const onBookEditSubmit = async (values) => {
        const result = await bookService.edit(values._id, values);

        setBooks(state => state.map(x => x._id === values._id ? result : x))

        navigate(`/catalog/${values._id}`);
    };

    const getBook = (bookId) => {
        return books.find(b => b._id === bookId);
    }

    const contextValues = {
        books,
        onCreateBookSubmit,
        deleteBook,
        onBookEditSubmit,
        getBook
    }

    return (
        <BookContext.Provider value={contextValues}>
            {children}
        </BookContext.Provider>
    )
}

export const useBookContext = () => {
    const context = useContext(BookContext);
    return context;
}