import { Link } from 'react-router-dom'
import styles from './CatalogItem.module.css'
export default function CatalogItem({
    title,
    author,
    imageUrl,
    summary,
    _id,
    isAuthenticated
}) {
    return(
        <article>
                <div className={styles.catalogItem}>
                <img src={imageUrl} alt={`image of ${title}`} />
                <div className={styles.itemsContainer}>
                    <div>
                        <h2>{title}</h2>
                        <h3>{author}</h3>
                    </div>
                    <p style={{textOverflow: 'ellipsis', overflow: 'hidden' }}>{summary}</p>
                    <div className={styles.buttons}>
                      {isAuthenticated &&  (<button>Like</button>)}
                        <Link to={_id}>Details</Link>
                    </div>
                </div>
            </div>
        </article>
    )
}