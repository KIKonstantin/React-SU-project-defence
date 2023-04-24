import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useAuthContext } from '../../contexts/AuthContext'
import { useForm } from '../../hooks/useForm';
import { MessageBox } from '../common/MessageBox';

const LoginFormKeys = {
    Email:'email',
    Username: 'username',
    Password: 'password',
}

export default function Login(){
    const { onLoginSubmit, errors } = useAuthContext()
    const {values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);
    return(
        <section className={styles.loginSection}>
            {errors.message}
            {errors && <MessageBox error={errors.message} />}
                <form id='login' method="post" onSubmit={onSubmit}>
                    <div className={styles.loginformInput}>
                        <h1>Login</h1>
                        <input
                            type="email"
                            id="email"
                            name={LoginFormKeys.Email}
                            placeholder="myEmail@email.com"
                            value={values[LoginFormKeys.Email]}
                            onChange={changeHandler}
                        />
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
        </section>
    )

};