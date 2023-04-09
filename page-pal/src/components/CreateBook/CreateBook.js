import { useBookContext } from "../../contexts/BookContext";
import { useForm } from "../../hooks/useForm";
import styles from './CreateBook.module.css';
import { MessageBox } from "../common/MessageBox";

export default function CreateBook(){
    const { onCreateBookSubmit, errors } = useBookContext();
    const { values, changeHandler, onSubmit} = useForm({
        title: '',
        author: '',
        imageUrl: '',
        summary: '',
        genre: '',
        pages: '',
        _createdOn: new Date().getTime()
    }, onCreateBookSubmit);

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
                    <select
                    id="favoriteGenre"
                    name= "genre"
                    value={values.genre}
                    onChange={changeHandler}
                    >
                    <option >Select your book genre</option>
                    <option value="mystery">Mystery</option>
                    <option value="romance">Romance</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Historical">Historical Fiction</option>
                    <option value="Young Adult">Young Adult</option>
                    <option value="Memoir">Memoir</option>
                    <option value="Biography">Biography</option>
                    <option value="Self Improvement">Self Improvement</option>
                </select>
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
            {errors && errors.map((m, i) =>(
                  <MessageBox key={i} message={m} />
            ))}
        </section>
    )
}