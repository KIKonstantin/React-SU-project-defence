import styles from "./LastAdded.module.css";
import { Link } from "react-router-dom";

export default function LastAdded({
  title,
  author,
  imageUrl,
  summary,
  _id,
}) {


  return (
    <div className={styles.card}>
      <div className={styles.front}>
        <img src={imageUrl} alt={title} className={styles.cover} />
        <div className={styles.info}>
          <h2>{title}</h2>
          <h3>{author}</h3>
        </div>
      </div>
      <div className={styles.back}>
        <p>{summary}</p>
        <Link to={`/catalog/${_id}`} className={styles.button}>Read more</Link>
      </div>
    </div>
  );
}