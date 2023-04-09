import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { authServiceFactory } from "../../services/authService";
import styles from  './Profile.module.css';
// import { useMessageBox } from "../../contexts/MessageBoxContext";

export default function Profile(){

    const { token } = useAuthContext();
    const [userInfo, setUserInfo] = useState({});
    const authService =  authServiceFactory();
    // const { showMessage } = useMessageBox();

    useEffect(() => {
        authService.me(token)
        .then(result => setUserInfo({...result}))
    }, []);
    return(
        <div className={styles.container}>
        <div className={styles.header}>
        <h1 className={styles.title}>My PROFILE</h1>
        </div>
        <div className={styles.content}>
        <div className={styles.profile}>
            <div className={styles.avatar}>
                <img src={userInfo.imageUrl} alt="Profile Avatar" />
            </div>
            <div className={styles.info}>
                <h2 className={styles.username}>{userInfo.username}</h2>
                <h3 className={styles.email}>{userInfo.email}</h3>
                <p className={styles.favoriteGenre}>Favorite Genre: {userInfo.favoriteGenre}</p>
            </div>
        </div>
    </div>
</div>

    )
}