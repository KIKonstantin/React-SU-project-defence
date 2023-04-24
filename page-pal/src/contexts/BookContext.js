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
    let errors = [];

    useEffect(() => {
        bookService.getAll()
        .then(result => {
            setBooks(result);
        })
    }, [])

    const onCreateBookSubmit = async (data) => {
        if(
            data.title === '' || data.author === '' ||
            data.imageUrl === '' || data.genre === '' ||
            data.summary === '' || data.pages === ''
          ){
            errors.push('All fields are required!')
        }
        if(errors.length > 0) {
            return data;
        } 
        try {
            const newBook = await bookService.create(data);
            setBooks(state => [...state, newBook]);
            navigate('/catalog');
        } catch (error) {
            alert(error.message)
        }

    };

    const deleteBook = (bookId) => {
        try {
            const updatedBooksCatalog = books.filter(b => b._id !== bookId);
            setBooks(updatedBooksCatalog);
        } catch (error) {
            alert(error.message)
            
        }
    }
    const onBookEditSubmit = async (values) => {
        if(
            values.title === '' || values.author === '' ||
            values.imageUrl === '' || values.genre === '' ||
            values.summary === '' || values.pages === ''
          ){
            errors.push('All fields are required!')
        }
        if(errors.length > 0) {
            return values;
        } 
        try {
            
            const result = await bookService.edit(values._id, values);
    
            setBooks(state => state.map(x => x._id === values._id ? result : x))
    
            navigate(`/catalog/${values._id}`);
        } catch (error) {
            alert(error.message)
            
        }
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