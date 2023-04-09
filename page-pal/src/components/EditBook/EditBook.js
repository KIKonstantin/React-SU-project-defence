import { useParams } from "react-router-dom";
import { useBookContext } from "../../contexts/BookContext";
import { bookServiceFactory } from "../../services/bookService";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import styles from './EditBook.module.css'

import { useNavigate } from "react-router-dom"
import { MessageBox } from "../common/MessageBox";
export default function EditBook() {
  const { onBookEditSubmit, errors } = useBookContext();
     const { bookId } = useParams();
     const navigate = useNavigate();
    const bookService = bookServiceFactory();
    
    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        title: '',
        author: '',
        imageUrl: '',
        summary: '',
        genre: '',
        pages: ''
    }, onBookEditSubmit);

    useEffect(() => {
        bookService.getOne(bookId)
        .then(result => {
            if(result.error){
                navigate('/not-found')
            }
            changeValues(result);
        }) 
    }, [bookId])

    return(
        <section className={styles.createBookContainer}>
                             {errors && errors.map((m, i) =>(
                  <MessageBox key={i} message={m} />
            ))}
        <form id="create" method="POST" onSubmit={onSubmit}>
            <h2>Edit your upload</h2>
            <div className={styles.createInputFields}>
                <label htmlFor="title">Book title: </label>
                <input 
                type="text"
                name="title"
                placeholder="Enter Book Title"
                value={values.title}
                onChange={changeHandler}
                />
                <label htmlFor="author">Book's Author: </label>
                <input 
                type="text"
                name="author"
                placeholder="Enter Book's Author"
                value={values.author}
                onChange={changeHandler}
                />
                <label htmlFor="image">Book's Cover: </label>
                <input 
                type="text"
                name="imageUrl"
                placeholder="Enter Book's Cover Image Url"
                value={values.imageUrl}
                onChange={changeHandler}
                />
                <label htmlFor="genre">Book's Ganre: </label>
                <input 
                type="text"
                name="genre"
                placeholder="Enter Book's Ganre"
                value={values.genre}
                onChange={changeHandler}
                />
                <label htmlFor="summary">Book's Summary: </label>
                <textarea 
                type="text"
                name="summary"
                rows={4}
                placeholder="Enter Book's Summary"
                value={values.summary}
                onChange={changeHandler}
                />
                <label htmlFor="pages">Book's Pages: </label>
                <input 
                type="text"
                name="pages"
                placeholder="Enter Book's Pages"
                value={values.pages}
                onChange={changeHandler}
                />
                <input type="submit" className={styles.submitBtn} value="Edit post" />
            </div>
        </form>    
    </section>
    )
};
