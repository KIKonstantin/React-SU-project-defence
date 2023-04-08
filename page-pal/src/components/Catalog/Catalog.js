import { useAuthContext } from "../../contexts/AuthContext";
import { useBookContext } from "../../contexts/BookContext";
import styles from './Catalog.module.css';
import CatalogItem from "./CatalogItem/CatalogItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
export default function Catalog(){
    const { isAuthenticated } = useAuthContext();
    const { books } = useBookContext();
    return(
        <>
        <div className={styles.bookContainer}>
        {books.map(x => <CatalogItem key={x._id} {...x} isAuthenticated={isAuthenticated}/>)}
        { isAuthenticated && (<Link to='/create-book' className={styles.createBook}>
            <FontAwesomeIcon icon={faPlus} className={styles.icon} />
        </Link>)}
        </div>
        </>
    )
}