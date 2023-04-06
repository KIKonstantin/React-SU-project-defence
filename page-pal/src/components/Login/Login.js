import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useAuthContext } from '../../contexts/AuthContext'
import { useForm } from '../../hooks/useForm';

const LoginFormKeys = {
    Email:'email',
    Username: 'username',
    Password: 'password',
}

export default function Login(){
    const { onLoginSubmit } = useAuthContext()
    const {values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);
    
    return(
        <section className={styles.loginSection}>
            <div className={styles.loginform}>
                <form id='login' method="post" onSubmit={onSubmit}>
                <div className={styles.loginformInput}>
                    <h1>Login</h1>
                {/* <label htmlFor="email">Email:</label> */}
                <input
                    type="email"
                    id="email"
                    name={LoginFormKeys.Email}
                    placeholder="myEmail@email.com"
                    value={values[LoginFormKeys.Email]}
                    onChange={changeHandler}
                />
                {/* <label htmlFor="username">Username:</label> */}
                {/* <label htmlFor="login-pass">Password:</label> */}
                <input
                    type="password"
                    id="login-password"
                    placeholder='password'
                    name={LoginFormKeys.Password}
                    value={values[LoginFormKeys.Password]}
                    onChange={changeHandler}
                />
                <input type="submit" className={styles.loginBtn} value="Login"/>
                <p className={styles.field}>
                    <span>If you don't have profile click <Link to="/register">here</Link></span>
                </p>
                </div>

                </form>
            </div>
        </section>
    )

};