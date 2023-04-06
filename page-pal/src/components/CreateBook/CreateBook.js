import { useBookCotext } from "../../contexts/BookContext";
import { useForm } from "../../hooks/useForm";
import styles from './CreateBook.module.css';

export default function CreateBook(){
    const { onCreateBookSubmit } = useBookCotext();
    const { values, changeHandler, onSubmit} = useForm({
        title: '',
        author: '',
        imageUrl: '',
        summary: '',
        genre: '',
        pages: '',
    }, onCreateBookSubmit);
    // TODO: Validate Data
    return(
        <section className={styles.createBookContainer}>
            <form id="create" method="POST" onSubmit={onSubmit}>
                <h2>Post a new book</h2>
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
                    <input type="submit" className={styles.submitBtn} value="Post your new passion" />
                </div>
            </form>    
        </section>
    )
}