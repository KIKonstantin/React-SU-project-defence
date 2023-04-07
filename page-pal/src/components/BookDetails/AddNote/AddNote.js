import styles from './AddNote.module.css';
import { useForm } from '../../../hooks/useForm';

export default function AddNote({
    onNoteSubmit
}){
  const { values, changeHandler, onSubmit } = useForm({
    note: '',
  }, onNoteSubmit);

  return (
    <article className={styles.addNoteContainer}>
        <form className={styles.noteForm} onSubmit={onSubmit}>
            <textarea name="note" placeholder='Leave a note' value={values.note} onChange={changeHandler} />
            <input type="submit" className={styles.noteSubmitBtn} value="Post Note" />
        </form>
    </article>
  )
}