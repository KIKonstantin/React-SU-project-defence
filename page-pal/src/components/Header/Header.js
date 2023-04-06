import { useState } from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [profileNavigation, setProfileNavigation] = useState(false);
    const { isAuthenticated } = useAuthContext();
    const location = useLocation();
    let headTitle = "Page Pal";
    let subtitle = "Your Book Tracker";
    switch(location.pathname) {
        case '/catalog':
            headTitle = "Catalog";
            subtitle='Check out our books';
            break;
        case '/about':
            headTitle = "About Us";
            subtitle='What you need to know';
            break;
        case '/user/me':
            headTitle = "My Profile";
            subtitle='';
            break;
        case '/favorites':
            headTitle = "My Favorite Books";
            subtitle='Checkout your favorite books';
            break;
        case '/create-book':
            headTitle = "Page Pal";
            subtitle='What is your new passion?';
            break;
        default:
    }
    const onHamburgerClick = () => {
        setIsOpen(!isOpen)
    }
    const onProfileNavigationClick = () => {
        setProfileNavigation(!profileNavigation)
    }
    return(
    <>
        <img className={styles.headerImg}src="images/Welcome-wave.svg" alt="wave-img" />
        <section className={styles.headerSection}>
            <div className={isOpen ? styles.change : ""} onClick={onHamburgerClick}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
                <nav className={isOpen ? styles.isActive : styles.notActive}>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/catalog'}>Catalog</Link>
                    <Link to={'/about'}>About Us</Link>
                </nav>
            </div>
            <section className={styles.welcome}>
                <p className={styles.welcome_subtitle}>{subtitle}</p>
                <h1 className={styles.welcome_title}>{headTitle}</h1>
            </section>
            <div className={`${profileNavigation ? styles.profOn : ""}`} onClick={onProfileNavigationClick}>
                <FontAwesomeIcon icon="user" size='xl'className={styles.profileIcon}/>
                <nav className={profileNavigation ? styles.isProfileNavigationOpen : styles.notActive}>
                    {isAuthenticated ? 
                    (
                        <>
                    <Link to={'/users/me'}>My Profile</Link>
                    <Link to={'/favorites'}>My Favorite Books</Link>
                    <Link to={'/logout'}>Logout</Link>
                    </>
                    ):
                    (
                    <>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Join Us</Link>
                    </>
                    )
                    }

                </nav>
            </div>
        </section>
    </>
    )
};