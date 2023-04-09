import { Link } from "react-router-dom";
import styles from './NotFound.module.css'
export default function NotFound(){
    return (
        <div className={styles.container}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
        <Link to="/" className={styles.btn}>Go back to Home</Link>
        </div>

    )
};